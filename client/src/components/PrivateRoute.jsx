import { Navigate } from 'react-router-dom';
import { useRecycleWise } from '../context/RecycleWiseContext';

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useRecycleWise();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
