"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Page from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export const savePageSetting = async (formData) => {
  const displayName = formData.get("displayName");
  const bio = formData.get("bio");
  const location = formData.get("location");
  const bgType = formData.get("bgType");
  const bgColor = formData.get("bgColor");
  const bgImage = formData.get("bgImage");

  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  try {
    await Page.updateOne(
      { owner: session?.user?.email },
      {
        displayName,
        bio,
        location,
        bgType,
        bgColor,
        bgImage,
      }
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
