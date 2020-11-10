import mongoose from "mongoose";

interface MessageAttrs {
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  message: string;
  read?: boolean;
  chatId: string;
}

interface MessageDoc extends mongoose.Document {
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  message: string;
  read?: boolean;
  chatId: string;
}

interface MessageModel extends mongoose.Model<MessageDoc> {
  build(attrs: MessageAttrs): MessageDoc;
}

const MessageSchema = new mongoose.Schema(
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
    },
    chatId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

MessageSchema.statics.build = (attrs: MessageAttrs): MessageDoc => {
  return new Message(attrs);
};

const Message = mongoose.model<MessageDoc, MessageModel>(
  "Message",
  MessageSchema
);

export { Message };
