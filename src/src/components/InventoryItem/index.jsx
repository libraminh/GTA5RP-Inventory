import { useInventoryContextMenu } from "@/hooks/useInventoryContextMenu";
import { useInventoryDbClick } from "@/hooks/useInventoryDbClick";
import { useRenderCount } from "@/hooks/useRenderCount";
import {
  setFastItems,
  setOtherItems,
  toggleNearPlayers,
} from "@/store/slices/InventorySlice";
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
  USE_ITEM,
} from "@/utils/constant";
import React from "react";
import {
  Draggable,
  Droppable,
  DragComponent,
  DragState,
} from "react-dragtastic";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import ItemLabel from "../ItemLabel";
import styled from "@emotion/styled";

import "./style.scss";

// const itemImages = require.context("@/assets/images", true);

// function getStyle(style, snapshot) {
//   if (!snapshot.isDragging) return {};
//   if (!snapshot.isDropAnimating) {
//     return style;
//   }

//   return {
//     ...style,
//     // cannot be 0, but make it super tiny
//     transitionDuration: `0.001s`,
//   };
// }

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
      item: {
        type: item.type,
        name: item.name,
      },
      number: parseInt(quantity),
      owner: false,
    };

    fetchAPI(eventApi, bodyHeader);
  };

  const handleItemClick = (e) => {
    e.preventDefault();
    console.log("handleItemClick", item);
  };

  const { renderCount } = useRenderCount(item);
  const isKeyHouse = item.name.includes("keyhouse");

  // const [{ isDragging }, drag, preview] = useDrag(
  //   () => ({
  //     type: dragType,
  //     item: { item, fromItem },
  //     end: (item, monitor) => {
  //       const dropResult = monitor.getDropResult();

  //       if (!item || !dropResult) return;

  //       console.log("dropResult", dropResult);

  //       switch (dropResult.name) {
  //         case "playerInventory":
  //           // fetchAPI(TAKE_FROM_TRUNK, bodyHeader);
  //           break;

  //         case OTHER_ITEM:
  //           handleItemApi(PUT_INTO_TRUNK);
  //           dispatch(setOtherItems(item.item));
  //           break;

  //         case PUT_INTO_FAST:
  //           if (item.item.type === ITEM_MONEY) return;

  //           dispatch(
  //             setFastItems({
  //               ...item,
  //               slot: dropResult.slot,
  //             })
  //           );

  //           fetchAPI(PUT_INTO_FAST, {
  //             item: item.item,
  //             slot: dropResult.slot + 1,
  //           });

  //           // handleItemApi(PUT_INTO_FAST);

  //           break;

  //         case TAKE_FROM_FAST:
  //           handleItemApi(TAKE_FROM_FAST);
  //           break;

  //         case USE_ITEM:
  //           handleItemApi(USE_ITEM);
  //           break;

  //         case DROP_ITEM:
  //           handleItemApi(DROP_ITEM);
  //           break;

  //         case GIVE_ITEM:
  //           dispatch(toggleNearPlayers());
  //           handleItemApi(GET_NEARS_PLAYERS);
  //           break;

  //         default:
  //           break;
  //       }
  //     },
  //     collect: (monitor) => ({
  //       isDragging: monitor.isDragging(),
  //       handlerId: monitor.getHandlerId(),
  //     }),
  //   }),
  //   [quantity]
  // );

  // const opacity = isDragging ? 0.4 : 1;

  const reorderRow = () => {
    console.log("reorderRow");
  };

  return (
    <>
      <Draggable type={PLAYER_ITEM} id={item.name}>
        {({ events, isActive }) => (
          <DragComponent for={item.name} alwaysRender>
            {({ x, y, isDragging }) => {
              return (
                <div
                  {...events}
                  style={{
                    position: isDragging && isActive ? "fixed" : "",
                    left: isDragging && isActive ? x - 55 : "",
                    top: isDragging && isActive ? y - 70 : "",
                  }}
                  className="flex flex-col overflow-hidden justify-between inventory_wrapper slot border border-solid border-gray-800 relative w-28 h-36 space-y-2 rounded-lg hover-drop transition-all duration-100 ease-in-out"
                  onContextMenu={(e) =>
                    handleItemContext(e, { item, fromItem })
                  }
                  onDoubleClick={(e) =>
                    handleDoubleClick(e, { item, index, fromItem })
                  }
                  // onClick={handleItemClick}
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

                    {item.type !== ITEM_MONEY && item.type !== ITEM_ACCOUNT && (
                      <div className="item-count item-weight ml-auto">
                        {item.weight > 0 ? convertToKg(item.weight) : ""}
                      </div>
                    )}
                  </div>

                  <div
                    id={`${
                      inventoryType === "main" ? "item" : "itemOther"
                    }-${index}`}
                    data-item={JSON.stringify(item)}
                    data-inventory={inventoryType}
                  >
                    <img
                      className="item w-14 object-contain object-center mx-auto"
                      src={
                        isKeyHouse
                          ? keyhouseImg
                          : `/build/static/media/${item.name}.png`
                      }
                      alt="image"
                    />

                    <div
                      className="weapon-bar rounded-lg"
                      style={{ height: `${item.doben}%` }}
                    ></div>
                  </div>

                  <ItemLabel>{item.label}</ItemLabel>
                  {/* <div className="item-name-bg"></div> */}
                </div>
              );
            }}
          </DragComponent>
        )}
      </Draggable>
    </>
  );
};

// const CloneItem = () => {
//   console.log("item", item);

//   return (

//   );
// };

InventoryItem.propTypes = {};

export default InventoryItem;
