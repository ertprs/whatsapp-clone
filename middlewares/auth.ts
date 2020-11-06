import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../Errors/NotAuthorizedError";
import jwt from "jsonwebtoken";

export interface JWT {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
}

declare module "express" {
  export interface Request {
    currentUser?: JWT;
  }
}

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.session?.isLoggedIn) {
    throw new NotAuthorizedError();
  }
  next();
};
