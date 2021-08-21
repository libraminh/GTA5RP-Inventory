import { inventoryItems } from "@/data/inventory-items";
import { ItemTypes } from "@/ItemTypes";
import { AppContext } from "@/store/appContext";
import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import InventoryItem from "../InventoryItem";

const InventoryPlayer = (props) => {
  const context = useContext(AppContext);
  const { quantity } = context.store;

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ["inventory_item", ItemTypes.FAST_ITEM],
      drop: () => ({ name: "playerInventory" }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    []
  );

  const isActive = canDrop && isOver;

  let backgroundColor = "#222";

  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }

  return (
    <div ref={drop} style={{ backgroundColor }}>
      <div className="flex flex-wrap gap-4 max-h-45vh overflow-y-auto">
        {inventoryItems?.map((item, index) => (
          <InventoryItem
            item={item}
            key={index}
            index={index}
            quantity={quantity}
          />
        ))}
      </div>
    </div>
  );
};

InventoryPlayer.propTypes = {};

export default InventoryPlayer;
