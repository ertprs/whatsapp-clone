import mongoose from "mongoose";

interface GroupMsgAttrs {
  from: mongoose.Types.ObjectId;
  group: mongoose.Types.ObjectId;
  message: string;
  createdAt: string;
  read?: boolean;
  readDate?: Date;
}

interface GroupMsgDoc extends mongoose.Document {
  from: mongoose.Types.ObjectId;
  group: mongoose.Types.ObjectId;
  message: string;
  createdAt: string;
  read?: boolean;
  readDate?: Date;
}

interface GroupMsgModel extends mongoose.Model<GroupMsgDoc> {
  build: (attrs: GroupMsgAttrs) => GroupMsgDoc;
}

const GroupMsgSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User"
    },
    group: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Group"
    },
    message: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    },
    read: {
      type: Boolean,
      default: false
    },
    readDate: {
      type: Date
    }
  },
  { timestamps: true }
);

GroupMsgSchema.statics.build = (attrs: GroupMsgAttrs): GroupMsgDoc => {
  return new GroupMsg(attrs);
};

const GroupMsg = mongoose.model<GroupMsgDoc, GroupMsgModel>(
  "GroupMsg",
  GroupMsgSchema
);

export { GroupMsg };
