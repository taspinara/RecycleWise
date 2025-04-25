import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const RecycleWiseContext = createContext();

const useRecycleWise = () => useContext(RecycleWiseContext);


const RecycleWiseProvider = ({ children }) => {
    const navigate = useNavigate();

    // Add any other state or functions you want to provide to your components
    // For example, you might want to manage user authentication state, etc.
    // const [user, setUser] = useState(null);
    // const login = (userData) => setUser(userData);
    // const logout = () => setUser(null);
    // const isAuthenticated = !!user;
    // const isAdmin = user?.role === 'admin'; // Example of checking if the user is an admin
    
    return (
        <RecycleWiseContext.Provider value={{ 
        // isAuthenticated,
        // isAdmin,
        // login,
        // logout,
        // user,
        navigate,   
        // Add any other context values you want to provide here
         }}>
        {children}
        </RecycleWiseContext.Provider>

    );
}  

export { RecycleWiseProvider, useRecycleWise };

