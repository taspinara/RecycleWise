import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
	{
		question: {
			type: String,
			required: true,
		},
		correctAnswer: {
			type: String,
			required: true,
		},
		decoyAnswers: {
			type: [String],
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
