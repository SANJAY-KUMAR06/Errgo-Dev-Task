import Doc from "../models/docModel.js";

export const getDocs = async (req, res) => {
  try {
    const docs = await Doc.find().sort({ updatedAt: -1 });
    res.json(docs);
  } catch {
    res.status(500).json({ error: "Failed to fetch docs" });
  }
};

export const createDoc = async (req, res) => {
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    const doc = await Doc.create({ title, content, updatedAt: new Date() });
    res.status(201).json(doc);
  } catch {
    res.status(500).json({ error: "Failed to create doc" });
  }
};
