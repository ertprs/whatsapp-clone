import { Request, Response, Router } from "express";
import { check } from "express-validator";
import { auth } from "../middlewares/auth";
import { validateRequest } from "../middlewares/validateRequest";
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
    res.send(newMessage);
  }
);

route.get(
  "/all/messages",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    const messages = await Message.find({ from: req.session?.user._id });
    res.send(messages);
  }
);

export { route as messageRoutes };
