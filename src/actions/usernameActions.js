"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Page from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function grapUsername(formData) {
  const username = formData.get("username");
  mongoose.connect(process.env.MONGODB_URI);
  const userTaken = await Page.findOne({ uri: username });
  if (userTaken) {
    return false;
  } else {
    const session = await getServerSession(authOptions)
    await Page.create({
      uri: username,
      owner: session?.user?.email
    });
    return username
  }
}
