import mongoose from 'mongoose';

const deploymentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  environment: { type: String, required: true },
  version: String,
  status: { type: String, default: 'pending' },
  deployedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Deployment', deploymentSchema);
