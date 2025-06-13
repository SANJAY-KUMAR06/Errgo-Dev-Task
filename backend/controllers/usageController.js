import Usage from "../models/usageModel.js";

export const createUsage = async (req, res) => {
  try {
    const { feature, count } = req.body;
    if (!feature || !count) {
      return res.status(400).json({ error: "Feature and count are required" });
    }

    const newUsage = await Usage.create({
      feature,
      count,
      timestamp: new Date(),
    });

    res.status(201).json(newUsage);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllUsage = async (req, res) => {
  try {
    const usageLogs = await Usage.find().sort({ timestamp: -1 });
    res.json(usageLogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch usage logs" });
  }
};
