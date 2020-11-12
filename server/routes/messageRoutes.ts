import { Request, Response, Router } from "express";
import { check } from "express-validator";
import { NotAuthorizedError } from "../Errors/NotAuthorizedError";
import { auth } from "../middlewares/auth";
import { validateRequest } from "../middlewares/validateRequest";
import { LastMsg } from "../models/LastMsg";
import { Message } from "../models/Message";
import { socket } from "../socket";
import mongoose from "mongoose";

const route = Router();

route.post(
  "/new/message",
  auth,
  check("to").trim().notEmpty().withMessage("to field cannot be empty"),
  check("message").trim().notEmpty().withMessage("message cannot be empty"),
  check("createdAt")
    .trim()
    .notEmpty()
    .withMessage("createdAt field cannot be empty"),
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    const { to, message, createdAt } = req.body;
    const newMessage = Message.build({
      from: req.session?.user._id,
      to,
      message,
      chatId: `${req.session!.user._id}${to}`,
      createdAt
    });
    await newMessage.save();
    const msg = await Message.findById(newMessage._id).populate("to from");
    socket.getIO().emit(`message`, {
      action: "create",
      message: msg
    });
    let lastMsgExist;
    lastMsgExist = await LastMsg.findOne({
      chatId: `${req.session!.user._id}${to}`
    }).populate("to from");
    if (!lastMsgExist) {
      lastMsgExist = await LastMsg.findOne({
        chatId: `${to}${req.session!.user._id}`
      }).populate("to from");
    }
    if (lastMsgExist) {
      lastMsgExist.message = message;
      await lastMsgExist.save();
      socket.getIO().emit(`message`, {
        action: "update",
        message: lastMsgExist
      });
    } else {
      const newLastMsg = LastMsg.build({
        from: req.session!.user._id,
        to,
        message,
        chatId: `${req.session!.user._id}${to}`
      });
      await newLastMsg.save();
      const newMsg = await LastMsg.findById(newLastMsg._id).populate("to from");
      socket.getIO().emit(`message`, {
        action: "update",
        message: newMsg
      });
    }

    res.send(newMessage);
  }
);

route.get(
  "/messages/:contactId",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    const messages = await Message.find({
      $or: [
        {
          chatId: `${req.params.contactId}${req.session!.user._id}`
        },
        {
          chatId: `${req.session!.user._id}${req.params.contactId}`
        }
      ]
    }).populate("to from");

    if (
      messages.length !== 0 &&
      // @ts-ignore
      messages[0].from._id.toHexString() !== req.session!.user._id.toString() &&
      // @ts-ignore
      messages[0].to._id.toHexString() !== req.session!.user._id.toString()
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
    // from: req.session!.user._id,
    //   to: req.session!.user._id
    const lastMsgs = await LastMsg.find({
      $or: [{ from: req.session!.user._id }, { to: req.session!.user._id }]
    })
      .populate("to from")
      .sort({
        updatedAt: -1
      });
    res.send(lastMsgs);
  }
);

route.post(
  "/update/read",
  auth,
  check("msgIds").isArray().withMessage("msgIds must be of type array"),
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    const { msgIds } = req.body;
    await Message.updateMany({ _id: msgIds }, { read: true });
    const updatedMessages = await Message.find({
      _id: { $in: msgIds }
    }).populate("to from");
    socket
      .getIO()
      .emit("read", { action: "change", messages: updatedMessages });
    res.send(updatedMessages);
  }
);

export { route as messageRoutes };
