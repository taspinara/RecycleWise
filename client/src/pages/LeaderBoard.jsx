import { useEffect, useState } from "react";
import QuizModal from "../components/QuizModal";
import { useRecycleWise } from "../context/RecycleWiseContext.jsx";
import axios from "axios";

const LeaderBoard = () => {
	const [showModal, setShowModal] = useState(false);

	const { user, API_BASE_URL } = useRecycleWise(); // Get the user from context	
	const [users, setUsers] = useState([]); // Initialize users state

	useEffect(() => {
		const getList = async () => {
      console.log(API_BASE_URL);
			try {
				const response = await axios.get(`${API_BASE_URL}/leaderboard`); // Fetch leaderboard data from the API
				console.log(response); // Log the response data for debugging
				setUsers(response.data); // Set the users state with the fetched data
			} catch (error) {
				console.error("Error fetching leaderboard data:", error); // Handle any errors
			}
		};
		getList(); // Call the function to fetch data
	}, [users]);

	return (
		<>
			{/* Main Content */}

			<div className='min-h-screen bg-gray-100 flex flex-col gap-6 items-center justify-center p-4'>
				<div className='bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6'>
					{/* Play the Game Button */}
					{user ? ( // Check if user is authenticated
						<div className='text-center mb-6'>
							<p className='text-2xl text-gray-800 my-4'>Are you eco-savvy ?</p>
							<button
								onClick={() => setShowModal(true)} // turn on the modal
								className='bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition'
							>
								Take the Quiz ?!
							</button>
						</div>
					) : (
						<div className='text-center mb-6'>
							<p className='text-2xl text-gray-800 my-4'>
								Please login to play the game
							</p>
							<button
								onClick={() => setShowModal(true)} // turn on the modal
								className='bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition'
							>
								Login
							</button>
						</div>
					)}
				</div>
				<div className='bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6'>
					<h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>
						🏆 Leaderboard
					</h1>
					<div className='grid grid-cols-12 gap-4 text-left font-medium text-gray-700 border-b border-gray-300 pb-2'>
						<div className='col-span-2'>Rank</div>
						<div className='col-span-6'>Name</div>
						<div className='col-span-4 text-right'>Score</div>
					</div>
					<div className='mt-4 space-y-3'>
						{users.map((elt, index) => (
							<div
								key={elt._id}
								className='grid grid-cols-12 gap-4 items-center bg-gray-50 hover:bg-gray-100 transition rounded-xl px-4 py-3'
							>
								<div className='col-span-2 font-semibold text-indigo-600'>
									#{index + 1}
								</div>
								<div className='col-span-6 text-gray-900'>
									{elt.userId.email}
								</div>
								<div className='col-span-4 text-right font-bold text-gray-800'>
									{elt.score}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{showModal && <QuizModal onClose={() => setShowModal(false)} />}
		</>
	);
};

export default LeaderBoard;
