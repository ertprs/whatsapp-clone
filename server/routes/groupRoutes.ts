import { Request, Response, Router } from "express";
import { check } from "express-validator";
import { auth, JWT } from "../middlewares/auth";
import { validateRequest } from "../middlewares/validateRequest";
import { Group } from "../models/Group";
import { GroupMsg } from "../models/GroupMsg";

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
  check("from").trim().notEmpty().withMessage("from field must be provided"),
  check("message").trim().notEmpty().withMessage("a message must be provided"),
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    const { from, message, name } = req.body;
    const group = Group.build({
      admin: req.session!.user._id,
      from,
      message,
      name,
      participants: [req.session!.user._id]
    });
    await group.save();
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
    res.send(groupMsg);
  }
);

export { route as groupRoutes };
