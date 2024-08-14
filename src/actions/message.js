"use server";

const { default: Message } = require("@/models/Message");
const { default: mongoose } = require("mongoose");

export async function messageSend(formData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const message = formData.get("message");

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Message.create({
      username,
      email,
      message,
    });
    return true;
  } catch (err) {
    console.log(err);
  }
}
