import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/ld+json' // Spécifier le Content-Type attendu par le backend
  }
});

export default api;
