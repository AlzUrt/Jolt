import React from "react";

const CustomInput = ({ placeholder, value, onChange }) => {
  return (
    <input
      className="w-full p-2 mb-4 border border-yellow-500 rounded placeholder-gray-700"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default CustomInput;
