import { Router } from "express";
import { requireAuth, isAdmin } from "../middleware/authMiddleware.js";
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  getPostById,
} from "../controllers/postControllers.js";

const router = Router();

router.get("/", requireAuth, getPosts);
router.post("/", requireAuth, createPost);
router.put("/:id", requireAuth, updatePost);
router.delete("/:id", requireAuth, deletePost);
router.get("/:id", requireAuth, getPostById);

export default router;
