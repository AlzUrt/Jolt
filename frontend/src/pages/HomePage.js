import React from "react";
import PrivateRoute from "../components/PrivateRoute";

const HomePage = () => {
  return (
    <PrivateRoute>
      <div className="min-h-screen flex flex-col">
        Bienvenue sur la page d'accueil
      </div>
    </PrivateRoute>
  );
};

export default HomePage;
