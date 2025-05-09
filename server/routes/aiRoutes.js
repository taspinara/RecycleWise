// server/routes/aiRoutes.js
import express from "express";
import multer from "multer";
import { askQuestion, askWithImage } from "../controllers/aiController.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/ask", askQuestion);
router.post("/ask-image", upload.single("image"), askWithImage);

export default router;
