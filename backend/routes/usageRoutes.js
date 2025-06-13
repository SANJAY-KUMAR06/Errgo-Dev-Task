import express from "express";
import {
  createUsage,
  getAllUsage,
} from "../controllers/usageController.js";

const router = express.Router();

router.post("/", createUsage);
router.get("/", getAllUsage);

export default router;
