"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Page from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const savePageSetting = async (formData) => {
  const displayName = formData.get("displayName");
  const bio = formData.get("bio");
  const location = formData.get("location");
  const bgType = formData.get("bgType");
  const bgColor = formData.get("bgColor");
  const bgImage = formData.get("bgImage");
  const image = formData.get("image");
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  if (bio.length > 150) {
    throw new Error("Bio exceeds the maximum allowed length!");
  }
  if (displayName.length > 20) {
    throw new Error("Display Name exceeds the maximum allowed length!");
  }
  if (location.length > 20) {
    throw new Error("Location exceeds the maximum allowed length!");
  }

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
        image,
      }
    );
    revalidatePath("/account");
    return true;
  } catch (err) {
    return false;
  }
};

export const buttonsSave = async (formData) => {
  const data = JSON.parse(formData.get("activeButtons"));
  const array = data.map((item) => ({
    key: item.key,
    value: formData.get(item.key),
  }));
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  try {
    await Page.updateOne(
      { owner: session?.user?.email },
      {
        buttons: array,
      }
    );
    revalidatePath("/account");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const linksSave = async (formData) => {
  const arrLength = JSON.parse(formData.get("links")).length;
  const links = [];
  for (let i = 0; i < arrLength; i++) {
    const id = formData.get("id-" + i);
    const title = formData.get("title-" + i);
    const subtitle = formData.get("subtitle-" + i);
    const url = formData.get("url-" + i);

    if (!url?.includes("https://")) {
      throw new Error("Invalid URL in LINK number: " + (i + 1));
    }

    links.push({ id, title, subtitle, url });
  }
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  try {
    await Page.updateOne(
      { owner: session?.user?.email },
      {
        links,
      }
    );
    revalidatePath("/account");
    return true;
  } catch (err) {
    throw new Error(err);
  }
};
