import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ textAlign: 'center', marginTop: '100px', fontSize: '20px' }}>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}