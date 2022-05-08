import mongoose from "mongoose";

const storycommentSchema = new mongoose.Schema({
  text: { type: String },
  createdAt: { type: Date, required: true, default: Date.now },
  writingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StoryWriting",
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const StoryComment = mongoose.model("StoryComment", storycommentSchema);
export default StoryComment;
