import { ItemTypes } from "@/ItemTypes";
import { FAST_ITEM, PLAYER_ITEM, TAKE_FROM_FAST } from "@/utils/constant";
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import "./style.scss";

const InventoryFastItem = ({ item, index, fromItem }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [PLAYER_ITEM, FAST_ITEM],
    drop: () => ({ name: "putIntoFastInventory" }),
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

  return (
    <div ref={drop} data-type={FAST_ITEM}>
      <div
        className={`inventoryItem slotFast relative w-28 h-28 flex items-center justify-center flex-col border border-solid border-gray-800 rounded-lg transition-all duration-200 ease-in-out ${
          isDropHover && "active-drop"
        }`}
      >
        <div className="keybind absolute right-0.5 -top-6">{index + 1}</div>
        <div className="item-count absolute top-1 left-2">{item.itemCount}</div>

        <div className="mb-1">
          <img
            ref={drag}
            id={`itemFast-${index}`}
            className="item w-14 object-contain object-center"
            src={item?.image}
            alt="image"
          />
        </div>

        <div className="item-name uppercase">{item.itemName}</div>
        <div className="item-name-bg"></div>
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
