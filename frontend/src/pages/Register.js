import React, { useState } from "react";
import Logo from "../images/logo.png";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import UserService from "../services/UserService";
import Header from "../components/Header";

const Register = () => {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirme, setPasswordConfirme] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      firstname,
      lastname,
      email,
      password,
      confirmPassword: passwordConfirme,
    };

    try {
      const registeredUser = await UserService.registerUser(userData);
      console.log("Utilisateur inscrit:", registeredUser);
    } catch (error) {
      console.error("L'inscription a échoué:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="flex justify-center mb-4">
          <img src={Logo} alt="logo Jolt" className="h-48" />
        </div>
        <form
          className="bg-white border-solid border-4 border-zinc-500 p-10 rounded-lg w-2/6 text-center"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center mb-6">
            <h1 className="text-4xl text-center mb-2">Bienvenue sur Jolt</h1>
          </div>
          <CustomInput
            placeholder="Nom"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <CustomInput
            placeholder="Prénom"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <CustomInput
            placeholder="Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomInput
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <CustomInput
            placeholder="Confirmer le mot de passe"
            value={passwordConfirme}
            onChange={(e) => setPasswordConfirme(e.target.value)}
          />
          <CustomButton
            text="S'inscrire"
            className="bg-yellow-500 hover:bg-yellow-600"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
