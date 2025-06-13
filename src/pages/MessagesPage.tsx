"use client";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/Sidebar";

type Message = {
  _id: string;
  username: string;
  content: string;
  timestamp: string;
};

const MessagesPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Fetch existing messages
    fetch("http://localhost:5000/api/messages")
      .then((res) => res.json())
      .then(setMessages);

    ws.current = new WebSocket("ws://localhost:5000");

    ws.current.onopen = () => {
      console.log(" Connected to WebSocket server");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "message") {
        const newMsg = data.message;
        setMessages((prev) => [newMsg, ...prev]);

        if (Notification.permission === "granted") {
          new Notification(" New Message", {
            body: `${newMsg.username}: ${newMsg.content}`,
          });
        }
      }
    };

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (!content.trim() || !username.trim()) return;

    const payload = { username, content, type: "message" };
    ws.current?.send(JSON.stringify(payload));
    setContent("");
  };

  const handleLogin = () => {
    if (username.trim()) {
      setLoggedIn(true);
      ws.current?.send(JSON.stringify({ type: "join", username }));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 max-w-3xl mx-auto">
        {!loggedIn ? (
          <div className="flex flex-col items-center gap-4 mt-20">
            <h2 className="text-2xl font-semibold text-gray-700">Enter your name to join chat</h2>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your name"
              className="border p-2 rounded w-64"
            />
            <button
              onClick={handleLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Join Chat
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-blue-700 mb-4">💬 Messages</h1>

            <div className="flex mb-4">
              <input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-l"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r"
              >
                ➤ Send
              </button>
            </div>

            <div className="space-y-2">
              {messages.map((msg) => (
                <div key={msg._id} className="bg-white p-3 rounded shadow-sm">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span className="font-semibold text-blue-800">{msg.username}</span>
                    <span>{new Date(msg.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-gray-800">{msg.content}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default MessagesPage;
