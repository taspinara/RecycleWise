import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LeaderBoard from "./pages/LeaderBoard";
import Events from "./pages/Events";
import Admin from "./pages/Admin";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthenticatedUser from "./components/AuthenticatedUser";

import {
  useRecycleWise,
  RecycleWiseProvider,
} from "./context/RecycleWiseContext";
import Chatbot from "./components/Chatbot/Chatbot";


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useRecycleWise();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Admin route to be protected
const AdminRoute = ({ children }) => {
  const { isAdmin } = useRecycleWise();

  const { isAuthenticated } = useRecycleWise();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <RecycleWiseProvider>
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route index element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <Admin />
                  </AdminRoute>
                }
              />
              <Route path="/leaderboard" element={<LeaderBoard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/recycling-tips" element={<LeaderBoard />} />
              <Route path="/me" element={<AuthenticatedUser />} />
              {/* Add more routes as needed */}
            </Routes>
          </div>
         
          <Footer />
          <Chatbot />
        </RecycleWiseProvider>
      </Router>
    </div>
  );
}

export default App;
