import { createContext, useContext, useState, useEffect, useMemo } from "react";
import {jwtDecode} from "jwt-decode"; // Corrected import

const RecycleWiseContext = createContext();

export const RecycleWiseProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(localStorage.getItem("token") || null);

	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

	const decodeToken = () => {
		if (!token) return null;

		try {
			const decoded = jwtDecode(token);
			// Check if the token is expired
			if (decoded.exp * 1000 < Date.now()) {
				console.warn("Token has expired");
				return null;
			}
			return decoded;
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
			setUser(null);
		}
	}, [token]);

	useEffect(() => {
		// Synchronize token with localStorage
		if (token) {
			localStorage.setItem("token", token);
		} else {
			localStorage.removeItem("token");
		}
	}, [token]);

	useEffect(() => {
		setIsAuthenticated(!!token);
		setIsAdmin(user?.role === "admin");
	}, [token, user]);

	const logout = () => {
		setToken(null);
		setUser(null);
		setIsAuthenticated(false);
		setIsAdmin(false);
	};

	const contextValue = useMemo(
		() => ({
			isAuthenticated,
			isAdmin,
			token,
			setToken,
			user,
			API_BASE_URL,
			logout, // Provide logout function
		}),
		[isAuthenticated, isAdmin, token, user, API_BASE_URL]
	);

	return (
		<RecycleWiseContext.Provider value={contextValue}>
			{children}
		</RecycleWiseContext.Provider>
	);
};

export const useRecycleWise = () => useContext(RecycleWiseContext);
