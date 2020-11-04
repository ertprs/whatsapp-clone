import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import "express-async-errors";
import { NotFound } from "./Errors/NotFound";
import { errorHandler } from "./middlewares/errorHandler";
import CookieSession from "cookie-session";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  CookieSession({
    signed: true,
    sameSite: true,
    httpOnly: true,
    secret: process.env.COOKIE_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 7
  })
);

// NOT FOUND ROUTE
app.all(
  "*",
  async (): Promise<void> => {
    throw new NotFound();
  }
);

app.use(errorHandler);

const connectMongo = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Mongo URI Must be provided");
    }
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log("Connected to db");
    app.listen(5000, () => console.log("Server started on port 5000"));
  } catch (error) {
    console.log(error);
  }
};

connectMongo();
