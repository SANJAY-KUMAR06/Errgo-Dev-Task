import mongoose from "mongoose";

const usageSchema = new mongoose.Schema({
  feature: { type: String, required: true },
  count: { type: Number, default: 1 },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Usage", usageSchema);
