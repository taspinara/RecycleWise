import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from '../utils/api';

const RecycleWiseContext = createContext();

export const useRecycleWise = () => useContext(RecycleWiseContext);

export const RecycleWiseProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await apiFetch('/auth/me');
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
    await apiFetch('/auth/logout', { method: 'POST' });
    setUser(null);
    navigate('/login');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <RecycleWiseContext.Provider
      value={{
        user,
        setUser,
        logout,
        isAuthenticated,
        isAdmin,
        loading,
        navigate,
      }}
    >
      {!loading && children}
    </RecycleWiseContext.Provider>
  );
};
