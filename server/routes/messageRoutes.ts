import { Request, Response, Router } from "express";
import { check } from "express-validator";
import { NotAuthorizedError } from "../Errors/NotAuthorizedError";
import { auth } from "../middlewares/auth";
import { validateRequest } from "../middlewares/validateRequest";
import { LastMsg } from "../models/LastMsg";
import { Message } from "../models/Message";

const route = Router();

route.post(
  "/new/message",
  auth,
  check("to").trim().notEmpty().withMessage("to field cannot be empty"),
  check("message").trim().notEmpty().withMessage("message cannot be empty"),
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    const { to, message } = req.body;
    const newMessage = Message.build({
      from: req.session?.user._id,
      to,
      message
    });
    await newMessage.save();
    const lastMsgExist = await LastMsg.findOne({ to });
    if (lastMsgExist) {
      lastMsgExist.message = message;
      await lastMsgExist.save();
    } else {
      const newLastMsg = LastMsg.build({
        from: req.session!.user._id,
        to,
        message
      });
      await newLastMsg.save();
    }

    res.send(newMessage);
  }
);

route.get(
  "/messages/:contactId",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    const messages = await Message.find({ to: req.params.contactId });
    if (
      messages.length !== 0 &&
      messages[0].from.toHexString() !== req.session!.user._id.toString()
    ) {
      throw new NotAuthorizedError();
    }
    res.send(messages);
  }
);

route.get(
  "/last/msg",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    const lastMsgs = await LastMsg.find({ from: req.session!.user._id }).sort({
      updatedAt: -1
    });
    res.send(lastMsgs);
  }
);

export { route as messageRoutes };
