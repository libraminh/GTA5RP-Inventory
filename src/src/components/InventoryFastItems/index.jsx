import { FAST_ITEM } from "@/utils/constant";
import React from "react";
import { useSelector } from "react-redux";
import InventoryFastItem from "../InventoryFastItem";

const InventoryFastItems = () => {
  const { fastItems } = useSelector((state) => state.inventorySlice);

  return (
    <div className="flex space-x-4 absolute left-1/2 bottom-14 transform-gpu -translate-x-1/2">
      {fastItems?.map((item, index) => (
        <InventoryFastItem
          fromItem={FAST_ITEM}
          key={index}
          item={fastItems[index]}
          index={index}
        />
      ))}
    </div>
  );
};

export default InventoryFastItems;
