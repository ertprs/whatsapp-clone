import mongoose from "mongoose";

interface LastMsgAttrs {
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  message: string;
  read?: boolean;
}

interface LastMsgDoc extends mongoose.Document {
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  message: string;
  read?: boolean;
}

interface LastMsgModel extends mongoose.Model<LastMsgDoc> {
  build(attrs: LastMsgAttrs): LastMsgDoc;
}

const LastMsgSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User"
    },
    to: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User"
    },
    message: {
      type: String,
      required: true
    },
    read: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

LastMsgSchema.statics.build = (attrs: LastMsgAttrs): LastMsgDoc => {
  return new LastMsg(attrs);
};

const LastMsg = mongoose.model<LastMsgDoc, LastMsgModel>(
  "LastMsg",
  LastMsgSchema
);

export { LastMsg };
