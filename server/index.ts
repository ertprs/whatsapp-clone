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
import next from "next";
import { messageRoutes } from "./routes/messageRoutes";
import socketio from "socket.io";

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // if (process.env.NODE_ENV === "development") {
  //   server.use(
  //     cors({
  //       origin: "http://localhost:3000",
  //       optionsSuccessStatus: 200
  //     })
  //   );
  // }

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  const MongoStore = store(session);

  const sessionStore = new MongoStore({
    uri: process.env.MONGO_URI as string,
    collection: "sessions"
  });

  server.use(
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

  server.use("/api", userRoutes);
  server.use("/api", messageRoutes);

  // NOT FOUND ROUTE
  // server.all(
  //   "*",
  //   async (): Promise<void> => {
  //     throw new NotFound();
  //   }
  // );

  // server.use(errorHandler);
  server.all("*", (req, res) => handle(req, res));

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
      const ioServer = server.listen(5000, () =>
        console.log("Server started on port 5000")
      );

      const io = new socketio.Server(ioServer);
      io.on("connection", socket => {
        console.log("Client Connected");
      });
    } catch (error) {
      console.log(error);
    }
  };

  connectMongo();
});
