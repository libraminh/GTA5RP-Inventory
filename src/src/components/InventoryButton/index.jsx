import { PLAYER_ITEM } from "@/utils/constant";
import React from "react";
import { useDrop } from "react-dnd";

const InventoryButton = ({ dropName, children }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: PLAYER_ITEM,
    drop: () => ({ name: dropName }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  if (isActive) {
  } else if (canDrop) {
    // backgroundColor = "red";
  }

  return (
    <button
      ref={drop}
      className={`text-base border-2 border-solid border-gray-800 py-2 rounded-lg transition-all duration-100 ease-in-out bg-gta-blue-400 ${
        isOver ? "bg-opacity-100" : "bg-opacity-50"
      }`}
    >
      {children}
    </button>
  );
};

export default InventoryButton;
