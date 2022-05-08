import mongoose from "mongoose";

const infoHeartSchema = new mongoose.Schema({
  count: { type: Number, default: 0, required: true },
  owner: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  writingId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "InfoWriting",
  },
});

const InfoHeart = mongoose.model("InfoHeart", infoHeartSchema);
export default InfoHeart;
