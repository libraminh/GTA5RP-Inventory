import { useInventoryContextMenu } from "@/hooks/useInventoryContextMenu";
import { useInventoryDbClick } from "@/hooks/useInventoryDbClick";
import { useRenderCount } from "@/hooks/useRenderCount";
import { toggleNearPlayers } from "@/store/slices/InventorySlice";
import { convertToKg, fetchAPI } from "@/utils";
import {
  DROP_ITEM,
  GET_NEARS_PLAYERS,
  GIVE_ITEM,
  ITEM_ACCOUNT,
  ITEM_MONEY,
  keyhouseImg,
  OTHER_ITEM,
  PLAYER_ITEM,
  PUT_INTO_FAST,
  PUT_INTO_TRUNK,
  TAKE_FROM_FAST,
  TAKE_FROM_SHOP,
  TAKE_FROM_TRUNK,
  USE_ITEM,
} from "@/utils/constant";
import React from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import ItemLabel from "../ItemLabel";
import "./style.scss";

// const itemImages = require.context("@/assets/images", true);
// src={isKeyHouse ? keyhouseImg : itemImages(`./${item.name}.png`)}

const InventoryItem = ({
  item,
  index,
  quantity,
  inventoryType,
  dragType,
  fromItem,
}) => {
  const dispatch = useDispatch();
  const { handleItemContext } = useInventoryContextMenu();
  const { handleDoubleClick } = useInventoryDbClick();

  const handleItemApi = (eventApi) => {
    const bodyHeader = {
      item,
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
          case PLAYER_ITEM:
            console.log("dropResult inventoryType >>", fromItem);

            if (fromItem === "trunk") {
              handleItemApi(TAKE_FROM_TRUNK);
              return;
            }
            if (fromItem === "shop") {
              handleItemApi(TAKE_FROM_SHOP);
              return;
            }
            break;

          case OTHER_ITEM:
            handleItemApi(PUT_INTO_TRUNK);
            // dispatch(setOtherItems(item));
            break;

          case PUT_INTO_FAST:
            if (item.item.type === ITEM_MONEY) return;

            // dispatch(
            //   setFastItems({
            //     ...item,
            //     slot: dropResult.slot,
            //   })
            // );

            fetchAPI(PUT_INTO_FAST, {
              item: item.item,
              slot: dropResult.slot + 1,
            });

            break;

          case TAKE_FROM_FAST:
            handleItemApi(TAKE_FROM_FAST);
            break;

          case USE_ITEM:
            // handleItemApi(USE_ITEM);
            fetchAPI(USE_ITEM, item.item);
            break;

          case DROP_ITEM:
            handleItemApi(DROP_ITEM);
            break;

          case GIVE_ITEM:
            fetchAPI(GET_NEARS_PLAYERS, {
              item: item.item,
              number: quantity,
            });
            dispatch(toggleNearPlayers());
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

  const { renderCount } = useRenderCount(item, fromItem);
  const isKeyHouse = item.name.includes("keyhouse");

  return (
    <>
      <div
        ref={drag}
        style={{ opacity }}
        className="flex flex-col overflow-hidden justify-between inventory_wrapper slot border border-solid border-gray-800 relative w-28 h-36 space-y-2 rounded-lg hover-drop transition-all duration-100 ease-in-out cursor-pointer"
        onContextMenu={(e) => handleItemContext(e, { item, fromItem })}
        onDoubleClick={(e) => handleDoubleClick(e, { item, index, fromItem })}
      >
        <div className="item-information flex items-center justify-between text-xs px-2 pt-1">
          {item.count.length !== 0 && (
            <div
              className={`item-count inline-flex items-center space-x-1 ${
                item.type === ITEM_MONEY || item.type === ITEM_ACCOUNT
                  ? "ml-auto"
                  : ""
              }`}
            >
              {renderCount()}
            </div>
          )}

          {item.type !== ITEM_MONEY &&
            item.type !== ITEM_ACCOUNT &&
            inventoryType !== "shop" && (
              <div className="item-count item-weight ml-auto">
                {item.weight > 0 ? convertToKg(item) : ""}
              </div>
            )}
        </div>

        <div
          id={`${fromItem === "main" ? "item" : "itemOther"}-${index}`}
          data-item={JSON.stringify(item)}
          data-inventory={inventoryType}
        >
          <img
            className="item w-14 object-contain object-center mx-auto"
            src={
              isKeyHouse ? keyhouseImg : `/build/static/media/${item.name}.png`
            }
            alt="image"
          />

          <div
            className="weapon-bar rounded-lg"
            style={{ height: `${item.doben}%` }}
          ></div>
        </div>

        <ItemLabel>{item.label}</ItemLabel>
      </div>
    </>
  );
};

InventoryItem.propTypes = {};

export default InventoryItem;
