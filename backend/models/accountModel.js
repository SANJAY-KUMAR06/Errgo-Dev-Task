import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  email: String,
  profilePic: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png" // 👈 Default avatar
  },
  bio: String,
}, { timestamps: true });

export default mongoose.model("Account", accountSchema);
