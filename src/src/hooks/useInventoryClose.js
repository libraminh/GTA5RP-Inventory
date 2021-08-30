import { useSelector } from "react-redux";

export const useInventoryClose = () => {
  const { type } = useSelector((state) => state.inventorySlice);

  const closeInventory = async () => {
    await fetch(`http://esx_inventoryhud/NUIFocusOff`, {
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
