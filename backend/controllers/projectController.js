import Project from "../models/Project.js";

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// Get 2 recent projects
export const getRecentProjects = async (req, res) => {
  try {
    const recentProjects = await Project.find().sort({ createdAt: -1 }).limit(2);
    res.status(200).json(recentProjects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recent projects" });
  }
};

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { title, description, techStack } = req.body;
    const newProject = new Project({ title, description, techStack });
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ error: "Failed to create project" });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
};
