import { Request, Response, Router } from "express";
import { check } from "express-validator";
import { auth } from "../middlewares/auth";
import { validateRequest } from "../middlewares/validateRequest";
import { Message } from "../models/Message";

const route = Router();

route.post(
  "/new/message",
  auth,
  check("from").trim().notEmpty().withMessage("from field cannot be empty"),
  check("to").trim().notEmpty().withMessage("to field cannot be empty"),
  check("message").trim().notEmpty().withMessage("message cannot be empty"),
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    const { from, to, message } = req.body;
    const newMessage = Message.build({ from, to, message });
    await newMessage.save();
    res.send(newMessage);
  }
);

export { route as messageRoutes };
