import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecycleWiseProvider } from "./context/RecycleWiseContext";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chatbot from "./components/Chatbot/Chatbot";

// import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <RecycleWiseProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* <Route
            path="/service"
            element={
              <PrivateRoute>
                <Service />
              </PrivateRoute>
            }
          /> */}
          {/* <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          /> */}
          {/* <Route
            path="/quiz"
            element={
              <PrivateRoute>
                <Quiz />
              </PrivateRoute>
            }
          /> */}
          {/* Add more routes as needed */}
        </Routes>
        <Chatbot />
        <Footer />
      </RecycleWiseProvider>
    </Router>
  );
}

export default App;
