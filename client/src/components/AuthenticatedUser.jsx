import { useRecycleWise } from "../context/RecycleWiseContext.jsx"; // Adjust the import based on your context structure

const AuthenticatedUser = () => {
	const { user } = useRecycleWise();

	if (!user) {
		return <p>Loading user data...</p>;
	}

	return (
		<div className='p-4 bg-gray-100 rounded shadow'>
			<h2 className='text-black text-xl font-bold'>Authenticated User</h2>
			<p className='text-black'>
				<strong>Username:</strong> {user.username}
			</p>
			<p className='text-black'>
				<strong>ID:</strong> {user.id}
			</p>
		</div>
	);
};

export default AuthenticatedUser;
