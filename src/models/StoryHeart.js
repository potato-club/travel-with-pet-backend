import mongoose from "mongoose";

const storyHeartSchema = new mongoose.Schema({
  count: { type: Number, default: 0, required: true },
  owner: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  ],
  writingId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "InfoWriting",
  },
});

const StoryHeart = mongoose.model("StoryHeart", storyHeartSchema);
export default StoryHeart;
