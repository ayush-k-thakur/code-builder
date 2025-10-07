import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  code: String,
  language: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Code", codeSchema);
