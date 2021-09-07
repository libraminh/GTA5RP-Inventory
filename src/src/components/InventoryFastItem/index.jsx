import { useRenderCount } from "@/hooks/useRenderCount";
import { removeFastItems } from "@/store/slices/InventorySlice";
import { convertToKg, fetchAPI } from "@/utils";
import {
  FAST_ITEM,
  ITEM_ACCOUNT,
  ITEM_MONEY,
  keyhouseImg,
  PLAYER_ITEM,
  PUT_INTO_FAST,
  TAKE_FROM_FAST,
} from "@/utils/constant";
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import ItemLabel from "../ItemLabel";
import "./style.scss";

// const itemImages = require.context("@/assets/images", true);

const InventoryFastItem = ({ item = {}, index, fromItem }) => {
  const dispatch = useDispatch();
  const { renderCount } = useRenderCount(item);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [PLAYER_ITEM, FAST_ITEM, PUT_INTO_FAST],
    drop: () => ({ name: PUT_INTO_FAST, slot: index }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: FAST_ITEM,
      item: { item, fromItem },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();

        if (!item || !dropResult) return;

        switch (dropResult.name) {
          case PUT_INTO_FAST:
            fetchAPI(PUT_INTO_FAST, {
              item: {
                ...item.item,
                slot: index + 1,
              },
              slot: dropResult.slot + 1,
            });
            break;

          case PLAYER_ITEM:
            if (fromItem !== FAST_ITEM) return;
            fetchAPI(TAKE_FROM_FAST, {
              item: {
                ...item.item,
                slot: index + 1,
              },
            });
            break;

          default:
            break;
        }
      },
      collect: (monitor) => {
        return {
          isDragging: monitor.isDragging(),
          handlerId: monitor.getHandlerId(),
        };
      },
    }),
    []
  );

  const isActive = canDrop && isOver;

  let isDropHover = false;

  if (isActive) {
    isDropHover = true;
  } else if (canDrop) {
  }

  const isKeyHouse = item.name?.includes("keyhouse");

  const handleContextMenu = (e, item) => {
    e.preventDefault();
    fetchAPI(TAKE_FROM_FAST, {
      item: {
        ...item,
        slot: index + 1,
      },
    });
    dispatch(removeFastItems({ item, index }));
  };

  return (
    // ref={drop}

    <div data-type={FAST_ITEM}>
      {/* ${isDropHover ? "active-drop" : ""} */}
      <div
        className={`inventoryItem slotFast relative w-28 h-32 flex items-center justify-between flex-col border border-solid border-gray-800 rounded-lg transition-all duration-100 ease-in-out hover-drop ${
          isDropHover ? "active-drop" : ""
        }`}
        onContextMenu={(e) => handleContextMenu(e, item)}
      >
        <div className="keybind absolute right-0.5 -top-6">{index + 1}</div>

        {item.name && (
          <React.Fragment>
            <div className="item-information w-full flex items-center justify-between text-xs px-2 pt-1">
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
                <div className="item-count item-weight ml-auto">
                  {item.weight > 0 ? convertToKg(item.weight) : ""}
                </div>
              )}
            </div>

            <div ref={drag} className="w-full mb-1" id={`itemFast-${index}`}>
              <img
                className="item w-14 object-contain object-center mx-auto"
                // src={
                //   isKeyHouse ? keyhouseImg : itemImages(`./${item.name}.png`)
                // }
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
              />
            </div>

            <ItemLabel>{item.label}</ItemLabel>
            {/* <div className="item-name-bg"></div> */}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

InventoryFastItem.propTypes = {};

export default InventoryFastItem;
