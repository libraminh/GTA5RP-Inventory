import { PLAYER_ITEM } from "@/utils/constant";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useDrop } from "react-dnd";

const InventoryButton = ({ dropName, children }) => {
  // const [{ isOver, canDrop }, drop] = useDrop(() => ({
  //   accept: PLAYER_ITEM,
  //   drop: () => ({ name: dropName }),
  //   collect: (monitor) => ({
  //     isOver: monitor.isOver(),
  //     canDrop: monitor.canDrop(),
  //   }),
  // }));

  // const isActive = canDrop && isOver;

  // if (isActive) {
  // } else if (canDrop) {
  //   // backgroundColor = "red";
  // }

  return (
    // ref={drop}

    <Droppable droppableId={dropName} isDropDisabled={true}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {/* ${isOver ? "bg-opacity-100" : "bg-opacity-50"} */}
          <div
            className={`inline-flex items-center justify-center text-base border-2 border-solid border-gray-800 py-2 rounded-lg transition-all duration-100 ease-in-out bg-gta-blue-400 cursor-pointer `}
          >
            {children}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default InventoryButton;
