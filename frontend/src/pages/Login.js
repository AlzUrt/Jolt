import React, { useState } from 'react';
import Logo from '../images/logo.png';

const Login = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  const handleCloseBanner = () => {
    setIsBannerVisible(false);
  };

  const handleClick = () => {
    alert('Vous avez cliqué sur le bouton "Essayez gratuitement"');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <div className="flex justify-center mb-4">
        <img src={Logo} alt="logo Jolt" className="h-48" />
      </div>
      <div className="bg-white border-solid border-4 border-zinc-500 p-10 rounded-lg w-3/6 text-center">
        <h2 className="text-6xl text-center mt-16 mb-2">Bienvenue sur Jolt</h2>
        <p className="text-center text-gray-600 mb-6 text-2xl">
          Vous n'avez pas de compte ? <button onClick={handleClick} className="text-yellow-500">Essayez gratuitement</button>
        </p>
        <button className="w-4/6 h-16 justify-center bg-yellow-500 hover:bg-yellow-600 py-2 px-4 rounded mb-4">
          Continuer avec Google
        </button>
        <button className="w-4/6 h-16 border border-yellow-500 hover:bg-yellow-100 py-2 px-4 rounded mb-4">
          Continuer avec Facebook
        </button>
        <button className="w-4/6 h-16 border border-yellow-500 hover:bg-yellow-100 py-2 px-4 rounded mb-16">
          Continuer avec Email
        </button>
      </div>
      {isBannerVisible && (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 flex justify-between items-center">
          <span>Bandeau d'information</span>
          <button onClick={handleCloseBanner} className="text-white text-xl">&times;</button>
        </div>
      )}
    </div>
  );
};

export default Login;
