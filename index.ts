import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import "express-async-errors";
import { NotFound } from "./Errors/NotFound";
import { errorHandler } from "./middlewares/errorHandler";
import { userRoutes } from "./routes/userRoutes";
import cors from "cors";
import session from "express-session";
import store from "connect-mongodb-session";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "http://localhost:3000",
      optionsSuccessStatus: 200
    })
  );
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const MongoStore = store(session);

const sessionStore = new MongoStore({
  uri: process.env.MONGO_URI as string,
  collection: "sessions"
});

app.use(
  session({
    secret: process.env.COOKIE_SECRET as string,
    saveUninitialized: false,
    resave: false,
    store: sessionStore,
    cookie: {
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production"
    }
  })
);

app.use("/api", userRoutes);

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
