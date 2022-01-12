import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarImage: {
      type: String,
      default:
        "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",
    },
  },
  { timestamps: true }
);

const User = model("users", UserSchema);

export default User;
