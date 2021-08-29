import { inventoryItems } from "@/data/inventory-items";
import { FAST_ITEM, OTHER_ITEM, PLAYER_ITEM } from "@/utils/constant";
import React from "react";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import InventoryItem from "../InventoryItem";
import InvenotoryProgress from "../InventoryProgress";

const InventoryPlayer = (props) => {
  const { quantity, infoDivText } = useSelector(
    (state) => state.inventorySlice
  );

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
    // style={{ backgroundColor }}
    <div ref={drop}>
      <div
        className={`mb-5 p-4 border border-solid border-gray-800 rounded-lg transition-all duration-100 ease-in-out ${
          isDropHover && "active-drop"
        }`}
      >
        <div className="scrollbar-custom flex flex-wrap gap-2 max-h-50vh min-h-50vh overflow-y-auto pr-1">
          {inventoryItems?.map((item, index) => (
            <InventoryItem
              item={item}
              key={index}
              index={item.name}
              quantity={quantity}
              dragType={PLAYER_ITEM}
              fromItem={PLAYER_ITEM}
              inventoryType="main"
            />
          ))}
        </div>
      </div>

      <div>
        <div className="info-div">{infoDivText}</div>
        <InvenotoryProgress />
      </div>
    </div>
  );
};

InventoryPlayer.propTypes = {};

export default InventoryPlayer;
