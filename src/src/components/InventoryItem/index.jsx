import keyhouseImg from "@/assets/images/KeyHouse.png";
import { useInventoryContextMenu } from "@/hooks/useInventoryContextMenu";
import { useInventoryDbClick } from "@/hooks/useInventoryDbClick";
import { useRenderCount } from "@/hooks/useRenderCount";
import {
  setFastItems,
  setOtherItems,
  toggleNearPlayers,
} from "@/store/slices/InventorySlice";
import { fetchAPI } from "@/utils";
import {
  DROP_ITEM,
  GET_NEARS_PLAYERS,
  GIVE_ITEM,
  ITEM_ACCOUNT,
  ITEM_MONEY,
  OTHER_ITEM,
  PUT_INTO_FAST,
  PUT_INTO_TRUNK,
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
  const dispatch = useDispatch();

  const { renderCount } = useRenderCount(item);
  const { handleItemContext } = useInventoryContextMenu();
  const { handleDoubleClick } = useInventoryDbClick();

  const handleItemApi = (eventApi) => {
    console.log("quantity", quantity);
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

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: dragType,
      item: { item, fromItem },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();

        if (!item || !dropResult) return;

        console.log("dropResult", dropResult);

        switch (dropResult.name) {
          case "playerInventory":
            // fetchAPI(TAKE_FROM_TRUNK, bodyHeader);
            break;

          case OTHER_ITEM:
            handleItemApi(PUT_INTO_TRUNK);
            dispatch(setOtherItems(item.item));
            break;

          case PUT_INTO_FAST:
            if (item.item.type === ITEM_MONEY) return;

            dispatch(
              setFastItems({
                ...item,
                slot: dropResult.slot,
              })
            );

            fetchAPI(PUT_INTO_FAST, {
              item: item.item,
              slot: dropResult.slot + 1,
            });

            // handleItemApi(PUT_INTO_FAST);

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
            dispatch(toggleNearPlayers());
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

  return (
    <div
      style={{ opacity }}
      className="flex flex-col justify-between inventory_wrapper slot border border-solid border-gray-800 relative w-28 h-36 space-y-2 rounded-lg hover-drop transition-all duration-100 ease-in-out"
      onContextMenu={(e) => handleItemContext(e, { item, fromItem })}
      onDoubleClick={(e) => handleDoubleClick(e, { item, index, fromItem })}
      ref={drag}
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
      >
        <img
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
