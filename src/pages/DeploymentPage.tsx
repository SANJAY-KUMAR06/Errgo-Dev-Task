import React, { useEffect, useState } from "react";
import DeploymentCard from "@/components/DeploymentCard";
import Sidebar from "@/components/Sidebar";

const DeploymentsPage: React.FC = () => {
  const [deployments, setDeployments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    environment: "development",
    version: "",
    status: "pending"
  });

  const fetchDeployments = async () => {
    const res = await fetch("http://localhost:5000/api/deployments"); // adjust URL as needed
    const data = await res.json();
    setDeployments(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/deployments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setForm({ name: "", environment: "development", version: "", status: "pending" });
      fetchDeployments(); // live update
    } else {
      alert("Error adding deployment");
    }
  };

  useEffect(() => {
    fetchDeployments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <main className="flex-1 p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-purple-700 mb-4">Deployments</h1>

        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Deployment Name"
            value={form.name}
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Version"
            value={form.version}
            onChange={(e) => setForm({ ...form, version: e.target.value })}
            className="p-2 border rounded"
          />
          <select
            value={form.environment}
            onChange={(e) => setForm({ ...form, environment: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="development">Development</option>
            <option value="staging">Staging</option>
            <option value="production">Production</option>
          </select>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="pending">Pending</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            + Add Deployment
          </button>
        </form>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {deployments.map((deployment) => (
            <DeploymentCard key={deployment._id} deployment={deployment} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default DeploymentsPage;
