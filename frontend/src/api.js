import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/ld+json' // Spécifier le Content-Type attendu par le backend
  }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(response => response, error => {
  if (error.response.status === 401) {
    // Gérer l'expiration du token, par exemple en redirigeant vers la page de connexion
    localStorage.removeItem('jwtToken'); // Supprimer le token expiré
    window.location = '/login'; // Rediriger l'utilisateur vers la page de connexion
  }
  return Promise.reject(error);
});

export default api;
