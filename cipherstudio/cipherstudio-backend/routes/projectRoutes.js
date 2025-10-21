import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createProject, getUserProjects, updateProject, deleteProject } from "../controllers/projectController.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/:userId", protect, getUserProjects);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;
