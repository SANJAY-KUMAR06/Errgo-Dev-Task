import express from "express";
import Message from "../models/messageModel.js";

const router = express.Router();

// Get all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Save a message
router.post("/", async (req, res) => {
  try {
    const { username, content } = req.body;
    const message = new Message({ username, content });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: "Failed to save message" });
  }
});

export default router;
