import express from "express";
import { getQuiz } from "../controllers/quizController.js";

const router = express.Router();

// Route to get all quiz questions
router.route("/").get(getQuiz);

export default router;
