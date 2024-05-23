import axios from 'axios';

// Création de l'instance API avec les paramètres de base
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://chabertamaury.alwaysdata.net/jolt_backend/api',
  headers: {
    'Content-Type': 'application/ld+json'
  }
});
console.log(process.env.REACT_APP_API_URL);

// Intercepteur de requêtes pour ajouter le token d'authentification
api.interceptors.request.use(config => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Intercepteur de réponses pour gérer les erreurs d'authentification
api.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('jwtToken'); // Supprimer le token expiré
    window.location = '/login'; // Rediriger l'utilisateur vers la page de connexion
  }
  return Promise.reject(error);
});

export default api;
