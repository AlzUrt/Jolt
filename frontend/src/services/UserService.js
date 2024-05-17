import api from '../api.js';

const registerUser = async (userData) => {
  console.log('Données utilisateur :', userData);
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return error;
  }  
};

const loginUser = async (userData) => {
  console.log('Données utilisateur :', userData);
  try {
    const response = await api.post('/login_check', userData);
    const token = response.data.token;
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    return error;
  }
};

// Créez une variable pour l'objet et exportez cette variable
const userService = { registerUser, loginUser };
export default userService;
