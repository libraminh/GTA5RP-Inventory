import { inventoryItems } from "@/data/inventory-items";
import { ItemTypes } from "@/ItemTypes";
import { AppContext } from "@/store/appContext";
import { FAST_ITEM, OTHER_ITEM, PLAYER_ITEM } from "@/utils/constant";
import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import InventoryItem from "../InventoryItem";
import InvenotoryProgress from "../InventoryProgress";

const InventoryPlayer = (props) => {
  const context = useContext(AppContext);
  const { quantity, inventory } = context.store;

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [OTHER_ITEM, FAST_ITEM, ItemTypes.FAST_ITEM],
      drop: () => ({ name: "playerInventory" }),
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
              dragType={PLAYER_ITEM}
              fromItem={PLAYER_ITEM}
              inventoryType="main"
            />
          ))}
        </div>
      </div>

      <div>
        <div className="info-div">{inventory.infoDivText}</div>
        <InvenotoryProgress />
      </div>
    </div>
  );
};

InventoryPlayer.propTypes = {};

export default InventoryPlayer;
