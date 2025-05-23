import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import eventRoutes from "./routes/eventRoutes.js";

import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js"; // Import the post route
import errorHandler from "./middleware/errorHandler.js";
import aiRoutes from "./routes/aiRoutes.js"; // Import the AI route

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set
const MODE = process.env.MODE || "development"; // Default to 'development' if MODE is not set

const corsOptions = {
  origin: true,
  credentials: true, // Required for cookies/auth headers
};

app.use(cors(corsOptions)); // Enable CORS with specified options
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Import Routes
app.use("/api/events", eventRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/posts", postRoutes); // Add the post route

app.use(errorHandler); // Error handler middleware

// Catch-all route for 404 errors
app.get(/.*/, (req, res) => {
  res.status(404).send("Page does not exist");
});

// Server start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running in ${MODE} mode on ${PORT}`);
  });
});
