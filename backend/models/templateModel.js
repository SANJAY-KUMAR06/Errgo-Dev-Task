import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Template", templateSchema);
