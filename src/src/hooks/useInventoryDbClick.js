import { fetchAPI } from "@/utils";
import { PLAYER_ITEM, USE_ITEM } from "@/utils/constant";
import React from "react";
import { useInventoryClose } from "./useInventoryClose";

export const useInventoryDbClick = () => {
  const { closeInventory } = useInventoryClose();

  const handleDoubleClick = (e, { item, fromItem }) => {
    e.preventDefault();

    if (!item.usable || fromItem !== PLAYER_ITEM) return;
    fetchAPI(USE_ITEM, item);
    closeInventory();
  };

  return {
    handleDoubleClick,
  };
};
