import React, { useState, useCallback } from 'react';
import '../index.css';

function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    // Envoyer les données du formulaire au serveur pour créer un nouveau compte utilisateur
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Nom d'utilisateur :</label>
      <input type="text" id="username" value={username} onChange={event => setUsername(event.target.value)} />

      <label htmlFor="email">Adresse e-mail :</label>
      <input type="email" id="email" value={email} onChange={event => setEmail(event.target.value)} />

      <label htmlFor="password">Mot de passe :</label>
      <input type="password" id="password" value={password} onChange={event => setPassword(event.target.value)} />

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
