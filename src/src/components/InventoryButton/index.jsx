import React from "react";

const InventoryButton = ({ isDropHover, children }) => {
  return (
    <button
      className={`text-base border-2 border-solid border-gray-800 py-2 rounded-lg transition-all duration-200 ease-in-out bg-gta-blue-400 ${
        isDropHover ? "bg-opacity-100" : "bg-opacity-50"
      }`}
    >
      {children}
    </button>
  );
};

export default InventoryButton;
