import express from "express";

import {
	getLeaderboard,
	updateLeaderboard,
} from "../controllers/leaderboardController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to get the leaderboard
router.route("/").get(getLeaderboard).put(requireAuth, updateLeaderboard);

export default router;
