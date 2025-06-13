"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

type Item = {
  _id: string;
  name: string;
  type: string;
  description?: string;
  status: string;
};

const ItemsPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
    status: "active",
  });
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchItems = async () => {
    try {
      const res = await fetch("http://localhost:5000/items");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Failed to fetch items:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to add item");
      }

      setForm({ name: "", type: "", description: "", status: "active" });
      fetchItems(); // Live reflection
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-4"> Items</h1>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 sm:grid-cols-2 bg-white p-4 rounded shadow mb-6"
        >
          <input
            type="text"
            placeholder="Item Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Item Type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="p-2 border rounded"
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

          <button
            type="submit"
            disabled={loading}
            className={`col-span-2 text-white px-4 py-2 rounded ${
              loading ? "bg-blue-300" : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {loading ? "Adding..." : "➕ Add Item"}
          </button>
          {error && (
            <p className="text-red-600 col-span-2 text-sm">{error}</p>
          )}
        </form>

        <div className="grid gap-4">
          <h2 className="text-xl font-semibold text-gray-700"> Items List</h2>
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">{item.name}</span>
                  <span
                    className={`text-sm font-medium ${
                      item.status === "active"
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Type: {item.type}</p>
                {item.description && (
                  <p className="text-sm text-gray-500">
                    Description: {item.description}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No items found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ItemsPage;
