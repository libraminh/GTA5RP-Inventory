import { FAST_ITEM } from "@/utils/constant";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import InventoryFastItem from "../InventoryFastItem";

const InventoryFastItems = () => {
  const { fastItems } = useSelector((state) => state.inventorySlice);

  return (
    <div className="flex space-x-2.5 absolute left-1/2 bottom-14 transform-gpu -translate-x-1/2">
      {[...Array(9)]?.map((item, index) => (
        <InventoryFastItem
          fromItem={FAST_ITEM}
          key={index}
          // item={fastItems[index]}
          // item={item}
          index={index}
        />
      ))}
    </div>
  );
};

export default InventoryFastItems;
