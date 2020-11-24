import { Request, Response, Router } from "express";
import { check } from "express-validator";
import { auth, JWT } from "../middlewares/auth";
import { validateRequest } from "../middlewares/validateRequest";
import { Group } from "../models/Group";
import { GroupMsg } from "../models/GroupMsg";
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
    socket.getIO().emit("group", { action: "create", group });
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
    });
    await currentGroup?.save();
    socket
      .getIO()
      .emit(`${group}`, { action: "update", message: currentGroup });
    socket.getIO().emit(`${group}`, { action: "create", message: groupMsg });
    res.send(groupMsg);
  }
);

route.get(
  "/all/groups",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    const groups = await Group.find({ participants: req.session!.user._id });
    res.send(groups);
  }
);

export { route as groupRoutes };
