import React, { useState, useCallback } from 'react';
import '../index.css';
import api from '../api';


function RegistrationPage() {
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirme, setPasswordConfirme] = useState('');

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/register', {
        firstname,
        lastname,
        email,
        password,
        confirmPassword: passwordConfirme,
      }, {
        headers: {
          'Content-Type': 'application/ld+json',
        },
      });

      console.log(response.data);
      // Vous pouvez gérer la réponse du serveur ici, par exemple, rediriger l'utilisateur vers une page de connexion
    } catch (error) {
      console.error(error);
      // Vous pouvez gérer les erreurs ici, par exemple, afficher un message d'erreur à l'utilisateur
    }
  }, [firstname, lastname, email, password, passwordConfirme]);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="lastname">Nom de famille :</label>
      <input type="text" id="lastname" value={lastname} onChange={event => setLastname(event.target.value)} />

      <label htmlFor="firstname">Prénom :</label>
      <input type="text" id="firstname" value={firstname} onChange={event => setFirstname(event.target.value)} />

      <label htmlFor="email">Adresse e-mail :</label>
      <input type="email" id="email" value={email} onChange={event => setEmail(event.target.value)} />

      <label htmlFor="password">Mot de passe :</label>
      <input type="password" id="password" value={password} onChange={event => setPassword(event.target.value)} />

      <label htmlFor="passwordConfirme">Confirmation du mot de passe :</label>
      <input type="password" id="passwordConfirme" value={passwordConfirme} onChange={event => setPasswordConfirme(event.target.value)} />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        S'inscrire
      </button>
    </form>
  );
}

export default RegistrationPage;
