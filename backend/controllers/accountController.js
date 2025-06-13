import UserProfile from "../models/userProfile.js";

// Get profile 
export const getProfile = async (req, res) => {
  const { username } = req.params;
  const profile = await UserProfile.findOne({ username });
  if (!profile) return res.status(404).json({ error: "Profile not found" });
  res.json(profile);
};

// Create or update profile
export const saveProfile = async (req, res) => {
  const { username, email, bio, social, profilePicUrl } = req.body;
  const profile = await UserProfile.findOneAndUpdate(
    { username },
    { email, bio, social, profilePicUrl },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  res.json(profile);
};
