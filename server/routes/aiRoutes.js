// server/routes/aiRoutes.js
import express from "express";
import { askQuestion } from "../controllers/aiController.js";

const router = express.Router();

router.post("/ask", askQuestion);

export default router;
