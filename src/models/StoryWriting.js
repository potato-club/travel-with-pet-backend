import mongoose from "mongoose";

const infoWritingSchema = new mongoose.Schema({
  title: { type: String },
  tags: { type: String },
  contents: { type: String },
  heart: { type: Number, default: 0, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  commentCount: { type: Number, default: 0 },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
  ],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const StoryWriting = mongoose.model("StoryWriting", infoWritingSchema);
export default StoryWriting;
