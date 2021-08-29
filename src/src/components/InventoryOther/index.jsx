// import { inventoryItems } from "@/data/inventory-items";
import { AppContext } from "@/store/appContext";
import { OTHER_ITEM, PLAYER_ITEM } from "@/utils/constant";
import React, { useContext, useEffect } from "react";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import InventoryItem from "../InventoryItem";
import InvenotoryProgress from "../InventoryProgress";

const InventoryOther = (props) => {
  const { quantity, otherInventory } = useSelector(
    (state) => state.inventorySlice
  );

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

  const isOtherInventoryEmpty = otherInventory.length === 0;

  return (
    //
    <div>
      <div
        ref={drop}
        className={`mb-5 p-4 border border-solid border-gray-800 rounded-lg transition-all duration-100 ease-in-out min-h-48vh ${
          isDropHover ? "active-drop" : ""
        } ${
          isOtherInventoryEmpty &&
          "flex items-center justify-center text-center"
        }`}
      >
        <div className="scrollbar-custom flex flex-wrap gap-2 max-h-50vh overflow-y-auto pr-1">
          {isOtherInventoryEmpty ? (
            <h2 className="text-xl">Chưa có vật phẩm!</h2>
          ) : (
            otherInventory?.map((item, index) => (
              <InventoryItem
                item={item}
                key={item.name}
                index={index}
                quantity={quantity}
                dragType={OTHER_ITEM}
                fromItem={OTHER_ITEM}
                inventoryType="second"
              />
            ))
          )}
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
