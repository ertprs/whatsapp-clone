import { Request, Response, Router } from "express";
import { check } from "express-validator";
import { BadRequestError } from "../Errors/BadRequestError";
import { validateRequest } from "../middlewares/validateRequest";
import bcrypt from "bcrypt";
import { User } from "../models/User";

const route = Router();

route.post(
  "/register",
  check("firstName").trim().notEmpty().withMessage("first name is required"),
  check("lastName").trim().notEmpty().withMessage("last name is required"),
  check("email").trim().isEmail().withMessage("enter a valid email"),
  check("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("password must be six characters minimum"),
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    } = req.body as { [key: string]: string };
    if (password !== confirmPassword) {
      throw new BadRequestError("passwords do not match");
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new BadRequestError("A user with that email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = User.build({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });
    await user.save();
    res.status(201).send(user);
  }
);

export { route as userRoutes };
