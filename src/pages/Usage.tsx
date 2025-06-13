"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Usage = {
  _id: string;
  feature: string;
  count: number;
  timestamp: string;
};

const UsagePage: React.FC = () => {
  const [form, setForm] = useState({ feature: "", count: 1 });
  const [usageData, setUsageData] = useState<Usage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsage = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/usage");
      const data = await res.json();
      setUsageData(data);
    } catch (err) {
      console.error("Failed to fetch usage:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/usage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to add usage");

      setForm({ feature: "", count: 1 });
      fetchUsage();
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
    fetchUsage();
  }, []);

  const chartData = {
    labels: usageData.map((u) => u.feature),
    datasets: [
      {
        label: "Usage Count",
        data: usageData.map((u) => u.count),
        backgroundColor: "rgba(59,130,246,0.7)",
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-4"> Usage Logs</h1>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 sm:grid-cols-2 bg-white p-4 rounded shadow mb-6"
        >
          <input
            type="text"
            placeholder="Feature Name"
            value={form.feature}
            onChange={(e) => setForm({ ...form, feature: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Count"
            value={form.count}
            onChange={(e) => setForm({ ...form, count: parseInt(e.target.value) })}
            className="p-2 border rounded"
            min={1}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`col-span-2 text-white px-4 py-2 rounded ${
              loading ? "bg-blue-300" : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {loading ? "Adding..." : "+ Add Usage"}
          </button>
          {error && (
            <p className="text-red-600 col-span-2 text-sm">{error}</p>
          )}
        </form>

        <div className="mb-6 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4"> Usage Chart</h2>
          <div className="w-full max-w-md mx-auto h-[250px]">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="grid gap-4">
          <h2 className="text-xl font-semibold text-gray-700"> Usage Logs</h2>
          {usageData.length > 0 ? (
            usageData.map((entry) => (
              <div key={entry._id} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">
                    {entry.feature}
                  </span>
                  <span className="text-sm text-gray-500">
                    Count: {entry.count}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Logged on: {new Date(entry.timestamp).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No usage logs yet.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default UsagePage;
