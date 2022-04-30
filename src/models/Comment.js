import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String },
  createdAt: { type: Date, required: true, default: Date.now },
  writing: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Writing",
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
