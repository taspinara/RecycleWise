import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

import { useRecycleWise } from "../context/RecycleWiseContext.jsx"; // Adjust the import based on your context structure

const Navbar = () => {
	const { isAuthenticated, user, navigate, logout } = useRecycleWise();

	const handleLogout = () => {
		logout(); // Call the logout function from the context
		navigate("/"); 
	};

	return (
		<>
			{/* Header Section */}
			<header className='bg-[#F7F0E5] text-black py-6'>
				<div className='container mx-auto px-4 flex justify-between items-center'>
					<h1 className='text-3xl font-bold'>
						<Link to='/'>
							<img
								src={logo}
								alt='logo recycle wise'
							/>
						</Link>
					</h1>
					<nav>
						<ul className='flex space-x-6'>
							<li>
								<a
									href='#about'
									className='hover:underline'
								>
									About Us
								</a>
							</li>
							<li>
								<Link
									to='/events'
									className='hover:underline'
								>
									Events
								</Link>
							</li>
							<li>
								<a
									href='#contact'
									className='hover:underline'
								>
									Contact
								</a>
							</li>
							{user && (
								<>
									<li>Welcome, {user.username}</li>
								</>
							)}
							<li>
								{isAuthenticated ? (
									<button
										onClick={handleLogout}
										className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700'
									>
										Logout
									</button>
								) : (
									<Link
										to='/login'
										className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700'
									>
										Sign In
									</Link>
								)}
							</li>
						</ul>
					</nav>
				</div>
			</header>
		</>
	);
};

export default Navbar;
