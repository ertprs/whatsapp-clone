import { Request, Response, Router } from "express";
import { check } from "express-validator";
import { NotAuthorizedError } from "../Errors/NotAuthorizedError";
import { auth, JWT } from "../middlewares/auth";
import { validateRequest } from "../middlewares/validateRequest";
import { Group } from "../models/Group";
import { GroupMsg } from "../models/GroupMsg";
import { User } from "../models/User";
import { socket } from "../socket";

const route = Router();
declare module "express" {
  export interface Session {
    user?: JWT;
  }
}
route.post(
  "/new/group",
  auth,
  check("name").trim().notEmpty().withMessage("name must be provided"),
  check("participants")
    .isArray({ min: 1 })
    .withMessage("participants cannot be empty"),
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    const { name, participants } = req.body;
    const group = Group.build({
      admin: req.session!.user._id,
      name,
      participants: [req.session!.user._id, ...participants]
    });
    await group.save();
    const populatedGroup = await Group.findById(group._id).populate(
      "participants",
      "firstName lastName"
    );
    socket.getIO().emit("group", { action: "create", group: populatedGroup });
    await User.updateMany(
      { _id: { $in: [...participants, req.session!.user._id] } },
      { $push: { groups: group._id } }
    );
    res.send(group);
  }
);
route.post(
  "/new/group/message",
  auth,
  check("group").trim().notEmpty().withMessage("group id must be provided"),
  check("message").trim().notEmpty().withMessage("message must be provided"),
  check("createdAt")
    .trim()
    .notEmpty()
    .withMessage("created at must be provided"),
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    const { group, message, createdAt } = req.body;
    const groupMsg = GroupMsg.build({
      from: req.session!.user._id,
      group,
      message,
      createdAt
    });
    await groupMsg.save();
    const currentGroup = await Group.findById(group).populate(
      "participants",
      "firstName lastName"
    );
    currentGroup!.lastMessage = message;
    await currentGroup?.save();
    socket
      .getIO()
      .emit(`${group}`, { action: "update", message: currentGroup });
    const populatedMsg = await GroupMsg.findById(groupMsg._id).populate(
      "from group"
    );
    socket
      .getIO()
      .emit(`${group}`, { action: "create", message: populatedMsg });
    res.send(populatedMsg);
  }
);

route.get(
  "/all/groups",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    const groups = await Group.find({
      participants: req.session!.user._id
    }).populate("participants", "firstName lastName");
    res.send(groups);
  }
);

route.get(
  "/group/messages/:groupId",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    const { groupId } = req.params;
    const user = await User.findById(req.session!.user._id);
    const groupNotFound =
      !user?.groups ||
      !user.groups.find(grp => grp.toString() === groupId.toString());
    if (groupNotFound) {
      throw new NotAuthorizedError();
    }
    const messages = await GroupMsg.find({ group: groupId }).populate(
      "from group"
    );

    res.send(messages);
  }
);

route.post(
  "/update/group/messages/read",
  auth,
  check("messageIds")
    .isArray({ min: 1 })
    .withMessage("message ids must be provided"),
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    const { messageIds } = req.body;
    await GroupMsg.updateMany(
      { _id: { $in: messageIds } },
      { read: true, readDate: new Date() }
    );
    const updatedMsgs = GroupMsg.find({ _id: { $in: messageIds } }).populate(
      "from group"
    );
    socket
      .getIO()
      .emit("groupread", { action: "change", groupMsgs: updatedMsgs });
    res.send(updatedMsgs);
  }
);

export { route as groupRoutes };
