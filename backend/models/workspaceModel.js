import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  status: { type: String, default: 'active', enum: ['active', 'inactive'] },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Workspace', workspaceSchema);
