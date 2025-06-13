"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const AccountsPage = () => {
  const [account, setAccount] = useState({
    username: "john_doe", // replace with logged-in user if needed
    name: "",
    email: "",
    bio: "",
    profilePic: "",
  });

  const [loading, setLoading] = useState(false);

  const fetchAccount = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/accounts/${account.username}`);
      if (res.ok) {
        const data = await res.json();
        setAccount((prev) => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(account),
      });
      const data = await res.json();
      setAccount((prev) => ({ ...prev, ...data }));
    } catch (err) {
      console.error("Failed to save profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-xl mx-auto bg-white rounded shadow p-6">
          <h1 className="text-2xl font-bold mb-6"> My Profile</h1>

          <div className="flex flex-col items-center mb-4">
            <img
              src={account.profilePic || defaultAvatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover shadow"
            />
            <input
              type="text"
              name="profilePic"
              placeholder="Profile Pic URL (optional)"
              value={account.profilePic}
              onChange={handleChange}
              className="mt-2 p-2 w-full border rounded"
            />
          </div>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={account.name}
            onChange={handleChange}
            className="mb-2 p-2 w-full border rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={account.email}
            onChange={handleChange}
            className="mb-2 p-2 w-full border rounded"
          />

          <textarea
            name="bio"
            placeholder="Short bio"
            value={account.bio}
            onChange={handleChange}
            className="mb-2 p-2 w-full border rounded"
          />

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Saving..." : " Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
