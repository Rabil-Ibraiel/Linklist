import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message =
  mongoose.models?.Message || mongoose.model("Message", messageSchema);
export default Message;
