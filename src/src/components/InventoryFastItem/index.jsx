import { ItemTypes } from "@/ItemTypes";
import { TAKE_FROM_FAST } from "@/utils/constant";
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import "./style.scss";

const InventoryFastItem = ({ item, index }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "inventory_item",
    drop: () => ({ name: "putIntoFastInventory" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.FAST_ITEM,
      item,
      end: (item, monitor) => {
        console.log("monitor", monitor);

        const dropResult = monitor.getDropResult();

        console.log("dropResult", dropResult);

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

  return (
    <div ref={drop} data-type="fast-item">
      <div
        ref={drag}
        className="inventoryItem slotFast relative w-26 h-26 flex items-center flex-col border border-solid border-grey-500"
      >
        <div className="keybind absolute right-0 -top-6">{index + 1}</div>
        <div className="item-count absolute top-1 left-2">{item.itemCount}</div>

        <img
          className="w-14 object-contain object-center"
          src={item.image}
          alt="image"
        />

        <div className="item-name mt-auto">{item.itemName}</div>
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
