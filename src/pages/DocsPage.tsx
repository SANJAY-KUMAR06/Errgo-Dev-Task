"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

type Doc = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

const DocsPage: React.FC = () => {
  const [form, setForm] = useState({ title: "", content: "" });
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDocs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/docs");
      const data = await res.json();
      setDocs(data);
    } catch (err) {
      console.error("Failed to fetch docs:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/docs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json(); 

      if (!res.ok) {
        throw new Error(data?.error || "Failed to add doc");
      }

      setForm({ title: "", content: "" });
      fetchDocs(); // Refresh the list
    } catch (err: any) {
      const message =
        typeof err === "string"
          ? err
          : err?.message || JSON.stringify(err) || "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-4"> Docs</h1>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 sm:grid-cols-2 bg-white p-4 rounded shadow mb-6"
        >
          <input
            type="text"
            placeholder="Document Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <textarea
            placeholder="Content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="p-2 border rounded h-28 sm:col-span-2 resize-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`col-span-2 text-white px-4 py-2 rounded ${
              loading ? "bg-blue-300" : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {loading ? "Adding..." : "+ Add Document"}
          </button>
          {error && (
            <p className="text-red-600 col-span-2 text-sm">{error}</p>
          )}
        </form>

        <div className="grid gap-4">
          <h2 className="text-xl font-semibold text-gray-700">Saved Docs</h2>
          {docs.length > 0 ? (
            docs.map((doc) => (
              <div key={doc._id} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">
                    {doc.title}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(doc.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
                  {doc.content}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No documents found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default DocsPage;
