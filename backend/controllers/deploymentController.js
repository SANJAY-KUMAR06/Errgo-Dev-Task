import Deployment from '../models/deploymentModel.js';

export const getDeployments = async (req, res) => {
  const deployments = await Deployment.find().sort({ deployedAt: -1 });
  res.json(deployments);
};

export const createDeployment = async (req, res) => {
  const { name, environment, version, status } = req.body;
  const newDeployment = new Deployment({
    name,
    environment,
    version,
    status,
    deployedAt: new Date()
  });

  const saved = await newDeployment.save();
  res.status(201).json(saved);
};

export const updateDeployment = async (req, res) => {
  const { id } = req.params;
  const updated = await Deployment.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};
