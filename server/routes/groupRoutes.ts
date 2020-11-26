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
    socket.getIO().emit("group", { action: "create", populatedGroup });
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
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    const { group, message } = req.body;
    const groupMsg = GroupMsg.build({
      from: req.session!.user._id,
      group,
      message
    });
    await groupMsg.save();
    const currentGroup = await Group.findByIdAndUpdate(group, {
      lastMessage: message
    }).populate("participants", "firstName lastName");
    await currentGroup?.save();
    socket
      .getIO()
      .emit(`${group}`, { action: "update", message: currentGroup });
    const populatedMsg = await GroupMsg.findById(groupMsg._id).populate(
      "user group"
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
    const groupNotFound =
      !req.session!.user.groups ||
      (req.session!.user.groups &&
        !req.session!.user.groups.find(
          (grp: any) => grp.toString() === groupId.toString()
        ));
    if (groupNotFound) {
      throw new NotAuthorizedError();
    }
    const messages = await GroupMsg.find({ group: groupId }).populate(
      "user group"
    );

    res.send(messages);
  }
);

export { route as groupRoutes };
