import { Router } from "express";
import { requireAuth, isAdmin } from "../middleware/authMiddleware.js";
import { getPosts, createPost } from "../controllers/postControllers.js";

const router = Router();

router.get("/", requireAuth, getPosts);
router.post("/", requireAuth, createPost);
// router.get("/:id");
// router.put("/:id");
// router.delete("/:id");

export default router;
