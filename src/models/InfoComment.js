import mongoose from "mongoose";

const infocommentSchema = new mongoose.Schema({
  text: { type: String },
  createdAt: { type: Date, required: true, default: Date.now },
  writingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InfoWriting",
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const InfoComment = mongoose.model("InfoComment", infocommentSchema);
export default InfoComment;
