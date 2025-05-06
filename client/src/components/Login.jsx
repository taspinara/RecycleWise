import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { useRecycleWise } from "../context/RecycleWiseContext";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { API_URL, setToken } = useRecycleWise();

	const navigate = useNavigate();

	const [error, setError] = useState("");

	// Handle input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		setError(""); // Reset error message

		if (!formData.email || !formData.password) {
			setError("Please fill in all fields");
			return;
		}

		if (formData.password.length < 6) {
			setError("Password must be at least 6 characters long");
			return;
		}

		try {
			// Connect to the backend API for login with axios
			const response = await axios.post(`${API_URL}/auth/login`, formData, {
				headers: { "Content-Type": "application/json" },
			});
			const data = response.data;
			localStorage.setItem("token", data.token); // Save token
			setToken(data.token); // Update context state
			navigate("/"); // Redirect to home
		} catch (err) {
			setError(err.response?.data?.message || "Login failed");
		}
	};

	return (
		<div className='flex justify-center items-center h-screen bg-gray-100'>
			<div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
				<h1 className='text-black text-2xl font-bold mb-6 text-center'>
					Login
				</h1>
				{error && <p className='text-red-500 mb-4'>{error}</p>}
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label
							htmlFor='email'
							className='block text-gray-700 font-medium mb-2'
						>
							Email
						</label>
						<input
							type='email'
							id='email'
							name='email'
							value={formData.email}
							onChange={handleInputChange}
							className='text-black w-full border border-gray-300 p-2 rounded'
							required
						/>
					</div>
					<div className='mb-4'>
						<label
							htmlFor='password'
							className='block text-gray-700 font-medium mb-2'
						>
							Password
						</label>
						<input
							type='password'
							id='password'
							name='password'
							value={formData.password}
							onChange={handleInputChange}
							className='text-black w-full border border-gray-300 p-2 rounded'
							required
						/>
					</div>
					<button
						type='submit'
						className='block text-center w-full bg-green-600 text-white py-2 rounded hover:bg-green-800'
					>
						Login
					</button>
				</form>
				<p className='mt-4 text-center text-gray-600'>
					Don't have an account?{" "}
					<Link
						to='/register'
						className='text-blue-600 hover:underline'
					>
						Register here
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
