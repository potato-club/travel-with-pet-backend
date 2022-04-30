import mongoose from "mongoose";

const infoWritingSchema = new mongoose.Schema({
  title: { type: String },
  category: { type: String },
  city: { type: String },
  detailCity: { type: String },
  tags: { type: String },
  contents: { type: String },
  heart: { type: Number, default: 0, required: true },
  commentCount: { type: Number, default: 0 },
  createdAt: { type: Date, required: true, default: Date.now },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
  ],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const InfoWriting = mongoose.model("InfoWriting", infoWritingSchema);
export default InfoWriting;
