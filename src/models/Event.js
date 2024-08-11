import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    type: {
      type: String,
      default: "view",
    },
    url: {
      type: String,
      default: null,
    },
    clickedTo: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Event = mongoose.models?.Event || mongoose.model("Event", eventSchema);
export default Event;
