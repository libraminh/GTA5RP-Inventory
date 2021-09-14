// import { setFastItems } from "@/store/slices/InventorySlice";
import { fetchAPI } from "@/utils";
import {
  DROP_ITEM,
  ITEM_ACCOUNT,
  ITEM_MONEY,
  OTHER_ITEM,
  PLAYER_ITEM,
  PUT_INTO_FAST,
  PUT_INTO_PROPERTY,
  PUT_INTO_SOCIETY,
  PUT_INTO_TRUNK,
  TAKE_FROM_PROPERTY,
  TAKE_FROM_SOCIETY,
  TAKE_FROM_TRUNK,
} from "@/utils/constant";
import { useSelector } from "react-redux";

export const useInventoryContextMenu = () => {
  const { fastItems, quantity, eventType } = useSelector(
    (state) => state.inventorySlice
  );

  const handleItemContext = async (e, { item, index, fromItem }) => {
    e.preventDefault();

    if (item.type === ITEM_MONEY) {
      return;
    }

    // handle alt + ctrl key + right click
    if (e.altKey && e.ctrlKey) {
      fetchAPI(DROP_ITEM, {
        item,
        number: parseInt(quantity),
      });
      return;
    }

    // handle alt + right click
    if (e.altKey) {
      if (fromItem === PLAYER_ITEM && eventType === "trunk") {
        fetchAPI(PUT_INTO_TRUNK, {
          item,
          number: quantity,
        });
        return;
      }

      if (fromItem === PLAYER_ITEM && eventType === "Society") {
        fetchAPI(PUT_INTO_SOCIETY, {
          item,
          number: quantity,
        });
        return;
      }

      if (fromItem === PLAYER_ITEM && eventType === "property") {
        fetchAPI(PUT_INTO_PROPERTY, {
          item,
          number: quantity,
        });
        return;
      }

      if (fromItem === OTHER_ITEM && eventType === "trunk") {
        fetchAPI(TAKE_FROM_TRUNK, {
          item,
          number: quantity,
        });
        return;
      }
      if (fromItem === OTHER_ITEM && eventType === "Society") {
        fetchAPI(TAKE_FROM_SOCIETY, {
          item,
          number: quantity,
        });
        return;
      }
      if (fromItem === OTHER_ITEM && eventType === "property") {
        fetchAPI(TAKE_FROM_PROPERTY, {
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
