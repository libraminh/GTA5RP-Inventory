// import { inventoryItems } from "@/data/inventory-items";
import { FAST_ITEM, OTHER_ITEM, PLAYER_ITEM } from "@/utils/constant";
import React from "react";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import InventoryItem from "../InventoryItem";
import InvenotoryProgress from "../InventoryProgress";

const InventoryPlayer = (props) => {
  // inventoryItems
  const { quantity, infoDivText, playerWeight, eventType, inventoryItems } =
    useSelector((state) => state.inventorySlice);

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [OTHER_ITEM, FAST_ITEM],
      drop: () => ({ name: PLAYER_ITEM }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    []
  );

  const isActive = canDrop && isOver;

  let isDropHover = false;

  if (isActive) {
    isDropHover = true;
  } else if (canDrop) {
  }

  return (
    <div ref={drop}>
      <div
        className={`mb-5 border border-solid border-gray-800 rounded-lg transition-all duration-100 ease-in-out ${
          isDropHover && "active-drop"
        }`}
      >
        <div className="scrollbar-custom flex flex-wrap content-start gap-3 max-h-50vh min-h-50vh overflow-y-auto p-4 pr-1">
          {inventoryItems?.map((item, index) => (
            <InventoryItem
              item={item}
              key={item.name}
              index={index}
              quantity={quantity}
              dragType={PLAYER_ITEM}
              fromItem={PLAYER_ITEM}
              inventoryType={eventType}
              itemInventory={"main"}
            />
          ))}
        </div>
      </div>
      <div>
        <InvenotoryProgress weightInfo={playerWeight} typeIcon="bagIcon" />
      </div>
    </div>
  );
};

InventoryPlayer.propTypes = {};

export default InventoryPlayer;
