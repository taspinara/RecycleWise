import { useEffect, useState } from "react";
import axios from "axios";
import { useRecycleWise } from "../context/RecycleWiseContext.jsx";

const QuizModal = ({ onClose }) => {
	const [currentQ, setCurrentQ] = useState(0);
	const [score, setScore] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null); // Error state for fetching questions
	const [saving, setSaving] = useState(false); // Loading state for saving quiz results

	const { API_BASE_URL, user, token } = useRecycleWise();
	const SLICE_MAXIMUM = 20; // Maximum number of questions to slice from the API
	const SLICE_LENGTH = 5; // Number of questions to display at a time

	useEffect(() => {
		const fetchQuestions = async () => {
			setLoading(true);
			setError(null); // Reset error state
			try {
				const response = await axios.get(`${API_BASE_URL}/quiz`);
				const startIndex = Math.floor(Math.random() * SLICE_MAXIMUM);
				const endIndex = startIndex + SLICE_LENGTH;
				setQuestions(response.data.slice(startIndex, endIndex));
			} catch (err) {
				console.error("Error fetching quiz data:", err);
				setError("Failed to load quiz questions. Please try again.");
			} finally {
				setLoading(false);
			}
		};
		fetchQuestions();
	}, [API_BASE_URL]);

	const handleAnswer = (option) => {
		const isCorrect = option === questions[currentQ]?.answer;
		if (isCorrect) setScore((prev) => prev + 1);

		setIsAnimating(true);
		setTimeout(() => {
			if (currentQ < questions.length - 1) {
				setCurrentQ((prev) => prev + 1);
			} else {
				setShowScore(true);
			}
			setIsAnimating(false);
		}, 300);
	};

	const resetQuiz = () => {
		setCurrentQ(0);
		setScore(0);
		setShowScore(false);
		setIsAnimating(false);
	};

	const handleSave = async () => {
		setSaving(true);
		setError(null); // Reset error state
		const userId = user?.id; // Use optional chaining
		const quizData = {
			userId,
			score: score * 10, // Assuming you want to save the score out of 100
		};

		try {
			const response = await axios.put(
				`${API_BASE_URL}/leaderboard`,
				quizData,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log("Quiz result saved:", response.data);
			onClose(); // Close the modal after saving
		} catch (err) {
			console.error("Error saving quiz result:", err);
			setError("Failed to save quiz results. Please try again.");
		} finally {
			setSaving(false);
		}
	};

	return (
		<div
			className='fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50'
			aria-modal='true'
			role='dialog'
		>
			<div
				className='relative bg-white rounded-xl shadow-2xl w-[90%] max-w-md p-6 transition-transform duration-300 transform'
				style={{
					transform: isAnimating ? "translateX(-100%)" : "translateX(0)",
					opacity: isAnimating ? 0 : 1,
				}}
			>
				<button
					className='absolute top-3 right-4 text-gray-500 text-xl font-bold'
					onClick={() => {
						resetQuiz();
						onClose();
					}}
					aria-label='Close quiz modal'
				>
					×
				</button>
				{loading ? (
					<p className='text-center text-gray-600'>Loading questions...</p>
				) : error ? (
					<p className='text-center text-red-500'>{error}</p>
				) : !showScore ? (
					<>
						<h2 className='text-xl font-semibold text-blue-800 mb-4'>
							Question {currentQ + 1} of {questions.length}
						</h2>
						<p className='text-lg text-gray-800 mb-6'>
							{questions[currentQ]?.question}
						</p>

						<div className='space-y-3'>
							{questions[currentQ]?.options.map((option, index) => (
								<button
									key={index}
									className='w-full bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium py-2 px-4 rounded-lg transition duration-200'
									onClick={() => handleAnswer(option)}
								>
									{option}
								</button>
							))}
						</div>
					</>
				) : (
					<div className='text-center'>
						<h2 className='text-2xl font-bold text-blue-800 mb-4'>
							Quiz Completed!
						</h2>
						<p className='text-lg text-gray-700 mb-6'>
							You scored <span className='font-bold'>{score * 10}</span> out of{" "}
							{questions.length * 10}.
						</p>
						{error && <p className='text-red-500 mb-4'>{error}</p>}
						<div className='flex justify-center gap-4'>
							<button
								onClick={resetQuiz}
								className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 rounded-lg font-medium'
							>
								Retry
							</button>
							<button
								onClick={handleSave}
								className='bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-5 rounded-lg font-medium'
								disabled={saving}
							>
								{saving ? "Saving..." : "Save"}
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default QuizModal;
