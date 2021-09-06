import { setFastItems } from "@/store/slices/InventorySlice";
import { fetchAPI } from "@/utils";
import {
  ITEM_MONEY,
  PUT_INTO_FAST,
  OTHER_ITEM,
  ITEM_ACCOUNT,
} from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";

export const useInventoryContextMenu = () => {
  const { fastItems } = useSelector((state) => state.inventorySlice);
  const dispatch = useDispatch();

  const handleItemContext = async (e, { item, index, fromItem }) => {
    e.preventDefault();

    if (
      item.type === ITEM_MONEY ||
      item.type === ITEM_ACCOUNT ||
      fromItem === OTHER_ITEM
    )
      return;

    // const isMainInventoryType = inventoryType === "main";

    let currentSlot = null;
    let stopLoop = false;

    fastItems.forEach((item, index) => {
      if (stopLoop) return;
      const isEmpty =
        Object.keys(item).length === 0 && item.constructor === Object;

      if (!isEmpty) return;
      currentSlot = index;
      stopLoop = true;
    });

    dispatch(setFastItems(item));

    fetchAPI(PUT_INTO_FAST, {
      item: {
        ...item,
        slot: index + 1,
      },
      slot: currentSlot + 1,
    });
  };

  return {
    handleItemContext,
  };
};
