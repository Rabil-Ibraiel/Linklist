import Event from "@/models/Event";
import mongoose from "mongoose";

export async function POST(req, res) {
  const item = await req.json()
  await mongoose.connect(process.env.MONGODB_URI);
  await Event.create({type: 'click', url: item.uri, clickedTo: item.url})
  return Response.json(true);
}
