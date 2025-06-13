import express from "express";
import Account from "../models/accountModel.js";

const router = express.Router();

// Create or update account
router.post("/", async (req, res) => {
  try {
    const { username, name, email, bio, profilePic } = req.body;

    let account = await Account.findOne({ username });

    if (account) {
      account.name = name;
      account.email = email;
      account.bio = bio;
      account.profilePic = profilePic || account.profilePic;
      await account.save();
    } else {
      account = new Account({
        username,
        name,
        email,
        bio,
        profilePic: profilePic || undefined, // default if empty
      });
      await account.save();
    }

    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get account by username
router.get("/:username", async (req, res) => {
  try {
    const account = await Account.findOne({ username: req.params.username });
    if (!account) return res.status(404).json({ error: "Not found" });
    res.json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
