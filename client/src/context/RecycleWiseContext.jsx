import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RecycleWiseContext = createContext();

export const RecycleWiseProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoading, setIsLoading] = useState(true); // ✅ NEW

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const decodeToken = () => {
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
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
    const initializeUser = () => {
      setIsLoading(true); // ✅ Start loading
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

      setIsLoading(false); // ✅ Done loading
    };

    initializeUser();
  }, [token]);

  useEffect(() => {
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
    localStorage.removeItem("token");
  };

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      isAdmin,
      token,
      setToken,
      user,
      isLoading, // ✅ EXPOSE to consumers
      API_BASE_URL,
      navigate,
      logout,
    }),
    [isAuthenticated, isAdmin, token, user, isLoading, API_BASE_URL, navigate]
  );

  return (
    <RecycleWiseContext.Provider value={contextValue}>
      {children}
    </RecycleWiseContext.Provider>
  );
};

export const useRecycleWise = () => useContext(RecycleWiseContext);
