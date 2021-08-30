import { setFastItems } from "@/store/slices/InventorySlice";
import { fetchAPI } from "@/utils";
import { ITEM_MONEY, PUT_INTO_FAST } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";

export const useInventoryContextMenu = () => {
  const { fastItems } = useSelector((state) => state.inventorySlice);
  const dispatch = useDispatch();

  const handleItemContext = async (e, { item, index, fromItem }) => {
    e.preventDefault();

    if (item.type === ITEM_MONEY) return;

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

// switch (type) {
//   case "trunk":
//     handleItemApi(isMainInventoryType ? PUT_INTO_TRUNK : TAKE_FROM_TRUNK);
//     break;
//   case "property":
//     handleItemApi(
//       isMainInventoryType ? PUT_INTO_PROPERTY : TAKE_FROM_PROPERTY
//     );
//     break;
//   case "Society":
//     handleItemApi(
//       isMainInventoryType ? PUT_INTO_SOCIETY : TAKE_FROM_SOCIETY
//     );
//     break;
//   case "vault":
//     handleItemApi(isMainInventoryType ? PUT_INTO_VAULT : TAKE_FROM_VAULT);
//     break;
//   case "player":
//     handleItemApi(isMainInventoryType ? PUT_INTO_PLAYER : TAKE_FROM_PLAYER);
//     break;
//   case "motels":
//     handleItemApi(PUT_INTO_MOTEL);
//     break;
//   case "motelsbed":
//     handleItemApi(PUT_INTO_MOTELBED);
//     break;
//   case "glovebox":
//     handleItemApi(PUT_INTO_GLOVEBOX);
//     break;
//   default:
//     break;
// }
