import mongoose from "mongoose";

interface ChannelAttrs {
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
}

interface ChannelDoc extends mongoose.Document {
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
}

interface ChannelModel extends mongoose.Model<ChannelDoc> {
  build(attrs: ChannelAttrs): ChannelDoc;
}

const ChannelSchema = new mongoose.Schema(
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
    }
  },
  { timestamps: true }
);

ChannelSchema.statics.build = (attrs: ChannelAttrs): ChannelDoc => {
  return new Channel(attrs);
};

const Channel = mongoose.model<ChannelDoc, ChannelModel>(
  "Channel",
  ChannelSchema
);

export { Channel };
