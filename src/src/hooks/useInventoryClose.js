import { hideUI } from "@/store/slices/InventorySlice";
import { useDispatch, useSelector } from "react-redux";

export const useInventoryClose = () => {
  const { type } = useSelector((state) => state.inventorySlice);
  const dispatch = useDispatch();

  const closeInventory = () => {
    dispatch(hideUI());

    fetch(`http://conde-b1g_inventory/NUIFocusOff`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type }),
    });
  };

  return {
    closeInventory,
  };
};
