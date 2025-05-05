import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RecycleWiseProvider } from './context/RecycleWiseContext'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

import LeaderBoard from './pages/LeaderBoard'

import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';

// import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
		<Router>
			<RecycleWiseProvider>
				<Routes>
					<Route
						index
						element={<Home />}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/register'
						element={<Register />}
					/>
					<Route
						path='/leaderboard'
						element={<LeaderBoard />}
					/>

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
			</RecycleWiseProvider>
		</Router>
	);
}

export default App
