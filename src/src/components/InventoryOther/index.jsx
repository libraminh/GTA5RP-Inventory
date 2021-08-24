import { inventoryItems } from "@/data/inventory-items";
import { AppContext } from "@/store/appContext";
import { OTHER_ITEM, PLAYER_ITEM } from "@/utils/constant";
import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import InventoryItem from "../InventoryItem";
import InvenotoryProgress from "../InventoryProgress";

const InventoryOther = (props) => {
  const context = useContext(AppContext);

  const { quantity } = context.store;

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [PLAYER_ITEM],
    drop: () => ({ name: "otherInventory" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  let isDropHover = false;

  if (isActive) {
    isDropHover = true;
  } else if (canDrop) {
  }

  return (
    //
    <div>
      <div
        ref={drop}
        className={`mb-5 p-4 border border-solid border-gray-800 rounded-lg transition-all duration-200 ease-in-out ${
          isDropHover && "active-drop"
        }`}
      >
        <div className="scrollbar-custom flex flex-wrap gap-4 max-h-45vh overflow-y-auto">
          {inventoryItems?.map((item, index) => (
            <InventoryItem
              item={item}
              key={index}
              index={index}
              quantity={quantity}
              dragType={OTHER_ITEM}
              fromItem={OTHER_ITEM}
              inventoryType="second"
            />
          ))}
        </div>
      </div>

      <div>
        <InvenotoryProgress />
      </div>
    </div>
  );
};

InventoryOther.propTypes = {};

export default InventoryOther;
