import keyhouseImg from "@/assets/images/KeyHouse.png";
import { useRenderCount } from "@/hooks/useRenderCount";
import { removeFastItems } from "@/store/slices/InventorySlice";
import {
  FAST_ITEM,
  ITEM_ACCOUNT,
  ITEM_MONEY,
  PLAYER_ITEM,
  PUT_INTO_FAST,
} from "@/utils/constant";
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import "./style.scss";

const itemImages = require.context("@/assets/images", true);

const InventoryFastItem = ({ item = {}, index, fromItem }) => {
  const dispatch = useDispatch();
  const { renderCount } = useRenderCount(item);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [PLAYER_ITEM, FAST_ITEM],
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
        console.log("item >>>", item);

        const dropResult = monitor.getDropResult();

        if (!item || !dropResult) return;

        switch (dropResult.name) {
          case "takeFromFastInventory":
            console.log("123");
            // fetchAPI(TAKE_FROM_FAST, bodyHeader);
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
    dispatch(removeFastItems({ item, index }));
  };

  return (
    <div ref={drop} data-type={FAST_ITEM}>
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
                  {item.weight}
                </div>
              )}
            </div>

            {/* <div className="item-count absolute top-1 left-2">{item.count}</div> */}

            <div className="mb-1" id={`itemFast-${index}`}>
              <img
                ref={drag}
                className="item w-14 object-contain object-center mx-auto"
                src={
                  isKeyHouse ? keyhouseImg : itemImages(`./${item.name}.png`)
                }
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
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

InventoryFastItem.propTypes = {};

export default InventoryFastItem;

{
  /* <div
  id={`itemFast-${index}`}
  className="item bg-no-repeat bg-contain w-20 h-20" // ui-droppable ui-draggable ui-draggable-handle
  style={{ backgroundImage: `url(${playersafe})` }}
>
  <div className="item-name-bg"></div>
</div> */
}

{
  /* <div
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
        </div> */
}
