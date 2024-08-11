import mongoose, { Schema } from "mongoose";

const PageSchema = new Schema(
  {
    uri: { type: String, required: true, min: 1, unique: true },
    owner: { type: String, required: true },
    displayName: { type: String, default: "" },
    location: { type: String, default: "" },
    bio: { type: String, default: "" },
    bgType: { type: String, default: "color" },
    bgColor: { type: String, default: "#9ca3af" },
    bgImage: { type: String, default: "" },
    buttons: { type: Object, default: [] },
    links: { type: Object, default: [] },
    image: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    },
  },
  { timestamps: true }
);

const Page = mongoose.models.Pages || mongoose.model("Pages", PageSchema);

export default Page;
