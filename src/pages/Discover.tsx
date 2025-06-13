"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

type Workspace = {
  _id: string;
  name: string;
  description?: string;
  status: string;
  tags: string[];
  createdAt: string;
};

const Discover: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "active",
    tags: "",
  });
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWorkspaces = async () => {
    const res = await fetch("http://localhost:5000/api/workspaces");
    const data = await res.json();
    setWorkspaces(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/workspaces", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        tags: form.tags.split(",").map(tag => tag.trim()),
      }),
    });

    const newWS = await res.json();
    setWorkspaces([newWS, ...workspaces]);
    setForm({ name: "", description: "", status: "active", tags: "" });
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:5000/api/workspaces/${id}`, {
      method: "DELETE",
    });
    setWorkspaces((prev) => prev.filter((ws) => ws._id !== id));
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6"> Discover Workspaces</h1>

        <form
          onSubmit={handleSubmit}
          className="grid sm:grid-cols-2 gap-4 bg-white p-4 rounded shadow mb-8"
        >
          <input
            type="text"
            placeholder="Workspace Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="p-2 border rounded"
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="p-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className={`col-span-2 text-white px-4 py-2 rounded ${
              loading ? "bg-blue-300" : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {loading ? "Adding..." : "+ Add Workspace"}
          </button>
        </form>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspaces.map((ws) => (
            <div key={ws._id} className="bg-white p-4 rounded shadow relative">
              <h2 className="text-xl font-semibold text-blue-700">{ws.name}</h2>
              <p className="text-sm text-gray-600">{ws.description}</p>
              <p
                className={`text-xs mt-2 inline-block px-2 py-1 rounded ${
                  ws.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                }`}
              >
                {ws.status}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {ws.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Created on {new Date(ws.createdAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleDelete(ws._id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </div>
          ))}
        </div>

        {workspaces.length === 0 && (
          <p className="text-gray-500 text-center mt-10">No workspaces found.</p>
        )}
      </main>
    </div>
  );
};

export default Discover;
