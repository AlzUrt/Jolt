import api from '../api.js';

const registerUser = async (userData) => {
  console.log('Données utilisateur :', userData);
  try {
    console.log("hehe");
    const response = await api.post('/register', userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    if (error.response) {
      // La requête a été faite et le serveur a répondu avec un statut hors de la plage 2xx
      console.error("Détails de l'erreur:", error.response.data);
      console.error("Statut de l'erreur:", error.response.status);
      console.error("Headers de l'erreur:", error.response.headers);
    } else if (error.request) {
      // La requête a été faite mais aucune réponse n'a été reçue
      console.error("La requête a été envoyée mais aucune réponse n'a été reçue", error.request);
    } else {
      // Quelque chose a mal tourné lors de la mise en place de la requête
      console.error("Erreur lors de la configuration de la requête:", error.message);
    }
    return error;
  }
  
};

export default registerUser;
