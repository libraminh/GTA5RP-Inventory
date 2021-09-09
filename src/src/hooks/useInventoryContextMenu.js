// import { setFastItems } from "@/store/slices/InventorySlice";
import { fetchAPI } from "@/utils";
import {
  ITEM_ACCOUNT,
  ITEM_MONEY,
  OTHER_ITEM,
  PLAYER_ITEM,
  PUT_INTO_FAST,
  PUT_INTO_TRUNK,
  TAKE_FROM_TRUNK,
} from "@/utils/constant";
import { useSelector } from "react-redux";

export const useInventoryContextMenu = () => {
  const { fastItems, quantity } = useSelector((state) => state.inventorySlice);

  const handleItemContext = async (e, { item, index, fromItem }) => {
    e.preventDefault();

    if (
      item.type === ITEM_MONEY ||
      item.type === ITEM_ACCOUNT ||
      fromItem === OTHER_ITEM
    ) {
      return;
    }

    // handle shift + right click
    if (e.shiftKey) {
      console.log("shiftKey ne >>>");

      if (fromItem === PLAYER_ITEM) {
        fetchAPI(PUT_INTO_TRUNK, {
          item,
          number: quantity,
        });
        return;
      }

      if (fromItem === OTHER_ITEM) {
        fetchAPI(TAKE_FROM_TRUNK, {
          item,
          number: quantity,
        });
        return;
      }
    }

    // handle right click
    let currentSlot = 1;
    let stopLoop = false;

    const fastItemSlots = fastItems.map((fast) => fast.slot);

    [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((slotNumber) => {
      if (stopLoop) return;

      if (!fastItemSlots.some((itemSlot) => itemSlot === slotNumber)) {
        currentSlot = slotNumber;
        stopLoop = true;
        return;
      }
    });

    fetchAPI(PUT_INTO_FAST, {
      item: {
        ...item,
        slot: index + 1,
      },
      slot: currentSlot,
    });
  };

  return {
    handleItemContext,
  };
};
