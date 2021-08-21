import { fetchAPI } from "@/utils";
import {
  PUT_INTO_FAST,
  PUT_INTO_TRUNK,
  TAKE_FROM_FAST,
  TAKE_FROM_TRUNK,
  USE_ITEM,
} from "@/utils/constant";
import React from "react";
import { useDrag } from "react-dnd";

const InventoryItem = ({ item, index, quantity }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "inventory_item",
      item,
      end: (item, monitor) => {
        console.log("monitor", monitor);

        const dropResult = monitor.getDropResult();

        console.log("dropResult", dropResult);

        const bodyHeader = {
          item: {
            type: item.type,
            name: item.name,
          },
          number: parseInt(quantity),
          owner: false,
        };

        if (!item || !dropResult) return;

        switch (dropResult.name) {
          case "playerInventory":
            fetchAPI(TAKE_FROM_TRUNK, bodyHeader);
            break;
          case "otherInventory":
            fetchAPI(PUT_INTO_TRUNK, bodyHeader);
            break;
          case "useInventory":
            fetchAPI(USE_ITEM, bodyHeader);
            break;
          case "putIntoFastInventory":
            fetchAPI(PUT_INTO_FAST, bodyHeader);
            break;
          case "takeFromFastInventory":
            fetchAPI(TAKE_FROM_FAST, bodyHeader);
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

  return (
    // has-items
    <div
      ref={drag}
      style={{ opacity }}
      className="slot border border-solid border-gta-blue-300 relative w-28 space-y-2 rounded-lg"
    >
      <div className="item-information flex items-center justify-between text-xs px-2 pt-1">
        <div className="item-count">{item.count}</div>
        <div className="item-count item-weight">{item.weight}</div>
      </div>

      <img
        id={`item-${index}`}
        className="item w-14 object-contain object-center mx-auto"
        src={item.image}
        alt="image"
      />

      <div className="item-name text-center uppercase text-xs font-semibold border-t border-solid border-gta-blue-300 py-1.5">
        {item.name}
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
