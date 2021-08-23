import React from "react";

const InventoryHeading = ({ children }) => {
  return (
    <h2 className="text-xl mb-5 border-b border-t border-solid border-gta-blue-300 pb-1 pt-0.5 px-5 inline-block">
      {children}
    </h2>
  );
};

export default InventoryHeading;
