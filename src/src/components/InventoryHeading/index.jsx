import React from "react";

const InventoryHeading = ({ children }) => {
  return (
    <h2 className="text-lg font-bold text-gta-blue-400 mb-2 pb-1 pt-0.5 inline-block">
      {children}
    </h2>
  );
};

export default InventoryHeading;
