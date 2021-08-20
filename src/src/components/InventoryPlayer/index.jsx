import React from "react";
import PropTypes from "prop-types";

import InventoryItem from "../InventoryItem";
import { inventoryItems } from "@/data/inventory-items";

import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";

const InventoryPlayer = (props) => {
  const { quantity } = useSelector((state) => state.globalSlice);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ["inventory_item"],
    drop: () => ({ name: "playerInventory" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const isActive = canDrop && isOver;

  let backgroundColor = "#222";

  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    // backgroundColor = "darkkhaki";
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
