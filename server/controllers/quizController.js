import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

export const getQuiz = async (req, res) => {
	try {
		const __filename = fileURLToPath(import.meta.url); // Get the resolved path to the file
		const __dirname = path.dirname(__filename); // Get the name of the directory
		const quizFilePath = path.join(__dirname, "../utils/quiz.json"); // Path to quiz.json

		// Read the quiz.json file
		const data = await fs.readFile(quizFilePath, "utf8");

		const quizData = JSON.parse(data); // Parse the JSON data

		// Send the quiz data to the client
		res.status(200).json(quizData);
	} catch (error) {
		console.error("Error reading or parsing quiz file:", error);
		res.status(500).json({ error: "Failed to retrieve quiz data" });
	}
};
