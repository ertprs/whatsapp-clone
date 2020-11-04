import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
