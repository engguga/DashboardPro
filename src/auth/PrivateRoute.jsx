// src/auth/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('auth'); // Verifica se está autenticado
  return isAuthenticated ? children : <Navigate to="/login" />; // Se não, redireciona para o login
};

export default PrivateRoute;