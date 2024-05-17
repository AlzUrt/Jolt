import React, { useState } from "react";
import Logo from "../images/logo.png";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  const handleCloseBanner = () => {
    setIsBannerVisible(false);
  };

  const handleEmailClick = () => {
    console.log('Vous avez cliqué sur le bouton "Continuer avec Email"');
    navigate("/register");
  };

  const handleLoginClick = () => {
    console.log('Vous avez cliqué sur le bouton "Se connecter"');
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex flex-col items-center relative">
      <div className="flex justify-center mb-4">
        <img src={Logo} alt="logo Jolt" className="h-48" />
      </div>
      <div className="bg-white border-solid border-4 border-zinc-500 p-10 rounded-lg w-3/6 text-center">
        <h2 className="text-6xl text-center mt-16 mb-2">Bienvenue sur Jolt</h2>
        <p className="text-center text-gray-600 mb-6 text-2xl">
          Vous n'avez pas de compte ?{" "}
          <button onClick={handleEmailClick} className="text-yellow-500">
            S'inscrire
          </button>
        </p>
        <CustomButton
          text="Continuer avec Google"
          className="bg-yellow-500 hover:bg-yellow-600"
        />
        <CustomButton text="Continuer avec Facebook" />
        <CustomButton text="Continuer avec Email" onClick={handleLoginClick} />
      </div>
      {isBannerVisible && (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 flex justify-between items-center">
          <span>Bandeau d'information</span>
          <button onClick={handleCloseBanner} className="text-white text-xl">
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Index;
