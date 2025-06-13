import Template from "../models/templateModel.js";

export const getAllTemplates = async (req, res) => {
  const templates = await Template.find().sort({ createdAt: -1 });
  res.json(templates);
};

export const addTemplate = async (req, res) => {
  const { name, description, category, tags } = req.body;
  if (!name) return res.status(400).json({ error: "Template name is required" });

  const newTemplate = await Template.create({
    name,
    description,
    category,
    tags,
  });
  res.status(201).json(newTemplate);
};

export const deleteTemplate = async (req, res) => {
  await Template.findByIdAndDelete(req.params.id);
  res.json({ message: "Template deleted successfully" });
};

export const updateTemplate = async (req, res) => {
  const updated = await Template.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};
