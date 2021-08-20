import React from "react";
import { fastItems } from "@/data/fast-item";
import InventoryItem from "../InventoryFastItem";

const InventoryFastItems = () => {
  return (
    <div className="flex space-x-4 absolute left-1/2 bottom-14 transform-gpu -translate-x-1/2">
      {fastItems?.map((item, index) => (
        <InventoryItem key={index} item={item} index={index} />
      ))}
    </div>
  );
};

export default InventoryFastItems;
