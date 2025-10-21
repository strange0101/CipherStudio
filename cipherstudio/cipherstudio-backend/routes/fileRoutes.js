import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createFile, getFile, updateFile, deleteFile, uploadMiddleware } from "../controllers/fileController.js";

const router = express.Router();

router.post("/", protect, uploadMiddleware, createFile);
router.get("/:id", protect, getFile);
router.put("/:id", protect, updateFile);
router.delete("/:id", protect, deleteFile);

export default router;
