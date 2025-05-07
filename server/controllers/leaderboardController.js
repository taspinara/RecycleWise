import Leaderboard from "../models/LeaderBoard.js";
import User from "../models/User.js";

import asyncHandler from "../utils/asyncHandler.js";

// @desc    Get leaderboard
// @route   GET /api/leaderboard
// @access  Public
export const getLeaderboard = asyncHandler(async (req, res) => {
	try {
		const leaderboard = await Leaderboard.find()
			.populate("userId", "username email") // Populate userId with name and email fields from User model
			.sort({ score: -1 }) // Sort by score in descending order
			.limit(10); // Limit to top 10 entries
        
		res.status(200).json(leaderboard);
	} catch (error) {
		res.status(500).json({ message: "Error fetching leaderboard" });
	}
});

// @desc    Update leaderboard
// @route   PUT /api/leaderboard
// @access  Public
export const updateLeaderboard = asyncHandler(async (req, res) => {
	const { userId, score } = req.body;

	if (!userId || !score) {
		return res.status(400).json({ message: "User ID and score are required" });
	}

	try {
		// Check if the user exists
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Update or create leaderboard entry
		const leaderboardEntry = await Leaderboard.findOneAndUpdate(
			{ userId },
			{ score },
			{ new: true, upsert: true } // Create a new entry if it doesn't exist
		);

		res.status(200).json(leaderboardEntry);
	} catch (error) {
		res.status(500).json({ message: "Error updating leaderboard" });
	}
});
