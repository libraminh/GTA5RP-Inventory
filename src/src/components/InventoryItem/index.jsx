import keyhouseImg from "@/assets/images/KeyHouse.png";
import { useRenderCount } from "@/hooks/useRenderCount";
import { setFastItems, setOtherItems } from "@/store/slices/InventorySlice";
import { fetchAPI } from "@/utils";
import {
  DROP_ITEM,
  GET_NEARS_PLAYERS,
  GIVE_ITEM,
  ITEM_ACCOUNT,
  ITEM_MONEY,
  PUT_INTO_FAST,
  TAKE_FROM_FAST,
  USE_ITEM,
} from "@/utils/constant";
import React from "react";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

const itemImages = require.context("@/assets/images", true);

const InventoryItem = ({
  item,
  index,
  quantity,
  inventoryType,
  dragType,
  fromItem,
}) => {
  const { type } = useSelector((state) => state.inventorySlice);
  const dispach = useDispatch();

  const { renderCount } = useRenderCount(item);

  const handleItemApi = (eventApi) => {
    const bodyHeader = {
      item: {
        type: item.type,
        name: item.name,
      },
      number: parseInt(quantity),
      owner: false,
    };

    fetchAPI(eventApi, bodyHeader);
  };

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: dragType,
      item: { item, fromItem },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();

        if (!item || !dropResult) return;

        switch (dropResult.name) {
          case "playerInventory":
            // fetchAPI(TAKE_FROM_TRUNK, bodyHeader);
            break;

          case "otherInventory":
            // handleItemApi(PUT_INTO_TRUNK);
            dispach(setOtherItems(item.item));
            break;

          case PUT_INTO_FAST:
            dispach(
              setFastItems({
                ...item,
                slot: dropResult.slot,
              })
            );
            handleItemApi(PUT_INTO_FAST);
            break;

          case TAKE_FROM_FAST:
            handleItemApi(TAKE_FROM_FAST);
            break;

          case USE_ITEM:
            handleItemApi(USE_ITEM);
            break;

          case DROP_ITEM:
            handleItemApi(DROP_ITEM);
            break;

          case GIVE_ITEM:
            handleItemApi(GET_NEARS_PLAYERS);
            break;

          default:
            break;
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [quantity]
  );

  const opacity = isDragging ? 0.4 : 1;
  const isKeyHouse = item.name.includes("keyhouse");

  const handleItemContext = async (e, { item, fromItem }) => {
    e.preventDefault();

    const isMainInventoryType = inventoryType === "main";

    const response = await dispach(setFastItems(item));

    // $.post(
    //   "http://conde-b1g_inventory/PutIntoFast",
    //   JSON.stringify({
    //     item: itemData,
    //     slot: i,
    //   })
    // );

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
  };

  return (
    // has-items
    <div
      style={{ opacity }}
      className="flex flex-col justify-between inventory_wrapper slot border border-solid border-gray-800 relative w-28 h-36 space-y-2 rounded-lg"
    >
      <div className="item-information flex items-center justify-between text-xs px-2 pt-1">
        {item.count.length !== 0 && (
          <div
            className={`item-count inline-flex items-center space-x-1 ${
              item.type === ITEM_MONEY ? "ml-auto" : ""
            }`}
          >
            {renderCount()}
          </div>
        )}

        {item.type !== ITEM_MONEY && item.type !== ITEM_ACCOUNT && (
          <div className="item-count item-weight ml-auto">{item.weight}</div>
        )}
      </div>

      <div
        id={`${inventoryType === "main" ? "item" : "itemOther"}-${index}`}
        data-item={JSON.stringify(item)}
        data-inventory={inventoryType}
        onContextMenu={(e) => handleItemContext(e, { item, fromItem })}
      >
        <img
          ref={drag}
          className="item w-14 object-contain object-center mx-auto"
          src={isKeyHouse ? keyhouseImg : itemImages(`./${item.name}.png`)}
          alt="image"
        />

        <div
          className="weapon-bar rounded-lg"
          style={{ height: `${item.doben}%` }}
        ></div>
      </div>

      <div className="item-name w-full text-center uppercase text-xs font-semibold border-t border-solid border-gray-800 py-1.5 px-1">
        {item.label}
      </div>
      {/* <div className="item-name-bg"></div> */}
    </div>
  );
};

InventoryItem.propTypes = {};

function samePropsItems(prevProps, nextProps) {
  return prevProps.quantity === nextProps.quantity;
}

export default React.memo(InventoryItem, samePropsItems);
