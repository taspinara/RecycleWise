import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const RecycleWiseContext = createContext();

export const RecycleWiseProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false); // State to manage admin status
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(localStorage.getItem("token") || null); // State to store the token

	const API_URL = import.meta.env.VITE_API_URL; // API URL from environment variables

	const decodeToken = () => {
		if (!token) return null;

		try {
			const decoded = jwtDecode(token);
			return decoded; // Returns the payload (e.g., { id, username, email, role})
		} catch (error) {
			console.error("Invalid token:", error);
			return null;
		}
	};

	useEffect(() => {
		const decoded = decodeToken();
		if (decoded) {
			setUser({
				id: decoded.id,
				username: decoded.username,
				email: decoded.email,
				role: decoded.role,
			});
		} else {
			setUser(null); // Reset user if token is invalid or expired
		}
	}, [token]);

	useEffect(() => {
		setIsAuthenticated(!!token); // Set authentication status based on token
	}, [token]);

	useEffect(() => {
		if (user) {
			setIsAdmin(user.role === "admin"); // Set admin status based on user role
		} else {
			setIsAdmin(false); // Reset admin status if user is null
		}
	}, [user]);

	// Add any other state or functions you want to provide to your components
	// For example, you might want to manage user authentication state, etc.
	// const login = (userData) => setUser(userData);
	// const logout = () => setUser(null);
	// const isAuthenticated = !!user;
	// const isAdmin = user?.role === 'admin'; // Example of checking if the user is an admin

	return (
		<RecycleWiseContext.Provider
			value={{
				isAuthenticated,
				isAdmin, // Provide the isAdmin state
				token,
				setToken, // Function to update the token
				user,
				API_URL,
				// Add any other context values you want to provide here
			}}
		>
			{children}
		</RecycleWiseContext.Provider>
	);
};

export const useRecycleWise = () => useContext(RecycleWiseContext);
