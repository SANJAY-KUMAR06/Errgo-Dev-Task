import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";

import projectRoutes from "./routes/projectRoutes.js";
import deploymentRoutes from "./routes/deploymentRoutes.js";
import usageRoutes from "./routes/usageRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import docRoutes from "./routes/docRoutes.js";
import workspaceRoutes from "./routes/workspacesRoutes.js";
import templateRoutes from "./routes/templateRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import Message from "./models/messageModel.js";
import accountRoutes from "./routes/accountRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(" MongoDB connection failed:", err));

// API routes
app.use("/api/projects", projectRoutes);
app.use("/api/deployments", deploymentRoutes);
app.use("/api/usage", usageRoutes);
app.use("/items", itemRoutes);
app.use("/api/docs", docRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/accounts", accountRoutes);

// Server + WebSocket setup
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});

const wss = new WebSocketServer({ server });

const clients = new Map(); 

wss.on("connection", (ws) => {
  console.log("New user connected");

  ws.on("message", async (data) => {
    try {
      const parsed = JSON.parse(data);

      
      if (parsed.type === "join") {
        clients.set(ws, parsed.username);
        console.log(`${parsed.username} joined the chat`);
        return;
      }

      const { username, content } = parsed;
      const newMsg = new Message({ username, content });
      const savedMsg = await newMsg.save();

      // Broadcast message to all clients
      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(JSON.stringify({ type: "message", message: savedMsg }));
        }
      });

    } catch (err) {
      console.error(" WebSocket error:", err);
    }
  });

  ws.on("close", () => {
    const username = clients.get(ws);
    clients.delete(ws);
    console.log(` ${username || "User"} disconnected`);
  });
});
