import mongoose from "mongoose";

const docSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

export default mongoose.model("Doc", docSchema);
