import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { RecycleWiseProvider } from './context/RecycleWiseContext'

function App() {

  return (
    <Router>
      <RecycleWiseProvider>
        <Routes>
          <Route index element={<Home />} />
          {/* <Route path="/service" element={<Service />} /> */}
          {/* <Route path="/admin" element={<Admin />} /> */}
          {/* <Route path="/quiz" element={<Quiz />} /> */}
          {/* Add more routes as needed */}
        </Routes>
      </RecycleWiseProvider>
    </Router>
  )
}

export default App
