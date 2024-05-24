import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correction de l'importation
import api from '../api'; // Correction de l'importation

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
      } else {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000; // Temps en secondes
          if (decodedToken.exp > currentTime) {
            try {
              // Utilisez l'instance 'api' qui inclut déjà le bon en-tête d'autorisation
              await api.get('/verify_token');
              setIsAuthenticated(true);
            } catch (error) {
              console.error('Token validation error:', error);
              localStorage.removeItem('jwtToken'); // Retirer un token invalide ou expiré
              setIsAuthenticated(false);
            }
          } else {
            localStorage.removeItem('jwtToken'); // Retirer un token expiré
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Invalid token:', error);
          localStorage.removeItem('jwtToken'); // Retirer un token invalide
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      }
    };
  
    validateToken();
  }, [token]);  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
