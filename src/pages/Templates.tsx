"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

type Template = {
  _id: string;
  name: string;
  description?: string;
  category?: string;
  tags: string[];
  createdAt: string;
};

const TemplatesPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    tags: "",
  });
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTemplates = async () => {
    const res = await fetch("http://localhost:5000/api/templates");
    const data = await res.json();
    setTemplates(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        tags: form.tags.split(",").map((tag) => tag.trim()),
      }),
    });

    const newTemplate = await res.json();
    setTemplates([newTemplate, ...templates]);
    setForm({ name: "", description: "", category: "", tags: "" });
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:5000/api/templates/${id}`, {
      method: "DELETE",
    });
    setTemplates((prev) => prev.filter((tpl) => tpl._id !== id));
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-800 mb-6"> Templates</h1>

        <form
          onSubmit={handleSubmit}
          className="grid sm:grid-cols-2 gap-4 bg-white p-4 rounded shadow mb-8"
        >
          <input
            type="text"
            placeholder="Template Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Category (e.g., Portfolio)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="p-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="p-2 border rounded col-span-2"
          />
          <button
            type="submit"
            disabled={loading}
            className={`col-span-2 text-white px-4 py-2 rounded ${
              loading ? "bg-purple-300" : "bg-purple-700 hover:bg-purple-800"
            }`}
          >
            {loading ? "Adding..." : "+ Add Template"}
          </button>
        </form>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((tpl) => (
            <div key={tpl._id} className="bg-white p-4 rounded shadow relative">
              <h2 className="text-xl font-semibold text-purple-700">{tpl.name}</h2>
              <p className="text-sm text-gray-600">{tpl.description}</p>
              {tpl.category && (
                <p className="text-xs mt-2 text-purple-600 bg-purple-100 inline-block px-2 py-1 rounded">
                  {tpl.category}
                </p>
              )}
              <div className="mt-2 flex flex-wrap gap-1">
                {tpl.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Created on {new Date(tpl.createdAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleDelete(tpl._id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </div>
          ))}
        </div>

        {templates.length === 0 && (
          <p className="text-gray-500 text-center mt-10">No templates available.</p>
        )}
      </main>
    </div>
  );
};

export default TemplatesPage;
