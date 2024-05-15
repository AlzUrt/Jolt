import React from "react";

const CustomButton = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick} // Ajoutez cette ligne
      className={`w-4/6 h-16 border border-yellow-500 hover:bg-yellow-100 py-2 px-4 rounded mb-4 ${className}`}
      style={{ borderWidth: "1px" }}
    >
      {text}
    </button>
  );
};

export default CustomButton;
