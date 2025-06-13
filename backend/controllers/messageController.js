import Message from "../models/messageModel.js";

// GET all messages 
export const getMessages = async (req, res) => {
  try {
    const msgs = await Message.find().sort({ createdAt: 1 });
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST a new message
export const addMessage = async (req, res) => {
  try {
    const { user, text } = req.body;
    if (!user || !text) {
      return res.status(400).json({ error: "User and message text are required." });
    }
    const msg = new Message({ user, text });
    const saved = await msg.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
