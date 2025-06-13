import express from "express";
import { getDocs, createDoc } from "../controllers/docController.js";
const router = express.Router();

router.get("/", getDocs);
router.post("/", createDoc);

export default router;
