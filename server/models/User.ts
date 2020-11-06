import mongoose from "mongoose";

interface UserArrs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserArrs): UserDoc;
}

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc: UserDoc, ret): void {
        delete ret.password;
      }
    }
  }
);

UserSchema.statics.build = (attrs: UserArrs): UserDoc => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);

export { User };
