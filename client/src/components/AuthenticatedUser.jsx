import { useRecycleWise } from "../context/RecycleWiseContext.jsx"; // Adjust the import based on your context structure

const AuthenticatedUser = () => {
	const { user } = useRecycleWise();
	console.log("AuthenticatedUser component rendered with user:", user);

	return (
		<>
		{user ? (
			<div className='p-4 bg-gray-100 rounded shadow'>
				<h2 className='text-black text-xl font-bold'>Authenticated User</h2>
				<p className='text-black'>
					<strong>Username:</strong> {user.username}
				</p>
				<p className='text-black'>
					<strong>ID:</strong> {user.id}
				</p>
				<p className='text-black'>
					<strong>Role:</strong> {user.role}
				</p>
			</div>
		) : (
			<div className='p-4 bg-red-100 rounded shadow'>
				<h2 className='text-red-800 text-xl font-bold'>No User Authenticated</h2>
				<p className='text-red-800'>Please log in to see user details.</p>
			</div>
		)}
		</>
	);
};

export default AuthenticatedUser;
