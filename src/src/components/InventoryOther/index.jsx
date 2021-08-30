// import { inventoryItems } from "@/data/inventory-items";
import { OTHER_ITEM, PLAYER_ITEM } from "@/utils/constant";
import React from "react";
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
    drop: () => ({ name: OTHER_ITEM }),
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
        className={`mb-5 border border-solid border-gray-800 rounded-lg transition-all duration-100 ease-in-out ${
          isDropHover ? "active-drop" : ""
        } `}
      >
        <div
          className={`scrollbar-custom w-full flex flex-wrap ${
            !isOtherInventoryEmpty && "content-start"
          } gap-3 max-h-50vh min-h-50vh overflow-y-auto p-4 pr-1 ${
            isOtherInventoryEmpty
              ? "flex items-center justify-center text-center"
              : ""
          }`}
        >
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
        <InvenotoryProgress typeIcon="carIcon" />
      </div>
    </div>
  );
};

InventoryOther.propTypes = {};

export default InventoryOther;
