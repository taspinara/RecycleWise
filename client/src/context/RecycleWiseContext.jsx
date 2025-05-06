import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from '../utils/api';

const RecycleWiseContext = createContext();

export const useRecycleWise = () => useContext(RecycleWiseContext);

export const RecycleWiseProvider = ({ children }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  // Get the token from cookies
  const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];


	const fetchUser = async () => {
		try {
			const res = await apiFetch("/auth/me");
			const data = await res.json();
			if (res.ok) setUser(data);
			else setUser(null);
		} catch {
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	const logout = async () => {
		await apiFetch("/auth/logout", { method: "POST" });
		setUser(null);
		navigate("/login");
	};

	const isAuthenticated = !!user;
	const isAdmin = user?.role === "admin";

	return (
		<RecycleWiseContext.Provider
			value={{
				API_BASE_URL,
				token,
				user,
				setUser,
				logout,
				isAuthenticated,
				isAdmin,
				loading,
				navigate,
			}}
		>
			{children}
		</RecycleWiseContext.Provider>
	);
};
