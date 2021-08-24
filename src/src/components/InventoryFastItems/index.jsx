import { fastItems } from "@/data/fast-item";
import { FAST_ITEM } from "@/utils/constant";
import React from "react";
import InventoryFastItem from "../InventoryFastItem";

const InventoryFastItems = () => {
  return (
    <div className="flex space-x-4 absolute left-1/2 bottom-14 transform-gpu -translate-x-1/2">
      {fastItems?.map((item, index) => (
        <InventoryFastItem
          fromItem={FAST_ITEM}
          key={index}
          item={item}
          index={index}
        />
      ))}
    </div>
  );
};

export default InventoryFastItems;
