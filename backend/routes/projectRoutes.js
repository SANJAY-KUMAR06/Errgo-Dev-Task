import express from "express";
import {
  getAllProjects,
  getRecentProjects,
  createProject,
  deleteProject
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getAllProjects);          
router.get("/recent", getRecentProjects); 
router.post("/", createProject);          
router.delete("/:id", deleteProject);     
router.get("/projects", getAllProjects); 
export default router;
