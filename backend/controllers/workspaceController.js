import Workspace from '../models/workspaceModel.js';

export const getAllWorkspaces = async (req, res) => {
  const workspaces = await Workspace.find().sort({ createdAt: -1 });
  res.json(workspaces);
};

export const addWorkspace = async (req, res) => {
  const { name, description, status, tags } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const newWorkspace = await Workspace.create({
    name,
    description,
    status,
    tags,
  });
  res.status(201).json(newWorkspace);
};

export const deleteWorkspace = async (req, res) => {
  await Workspace.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

export const updateWorkspace = async (req, res) => {
  const updated = await Workspace.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};
