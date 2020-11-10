import { Request, Response, Router } from "express";
import { check } from "express-validator";
import { auth } from "../middlewares/auth";
import { validateRequest } from "../middlewares/validateRequest";
import { Channel } from "../models/Channel";

const route = Router();

route.post(
  "/new/channel",
  auth,
  check("from").trim().notEmpty().withMessage("from field cannot be empty"),
  check("to").trim().notEmpty().withMessage("to field cannot be empty"),
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    const { from, to } = req.body;
    const channel = Channel.build({ from, to });
    res.send(channel);
  }
);

route.get(
  "/all/channels",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    const channels = await Channel.find({ from: req.session!.user._id });
    res.send(channels);
  }
);

export { route as channelRoutes };
