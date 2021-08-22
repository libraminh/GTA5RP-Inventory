import { fetchAPI, formatMoney } from "@/utils";
import {
  PUT_INTO_FAST,
  PUT_INTO_TRUNK,
  TAKE_FROM_FAST,
  TAKE_FROM_TRUNK,
  USE_ITEM,
} from "@/utils/constant";
import React, { useContext, useEffect } from "react";
import { useDrag } from "react-dnd";

import keyhouseImg from "@/assets/images/KeyHouse.png";
import { AppContext } from "@/store/appContext";
import bulletIcon from "@/assets/images/bullet.png";

const itemImages = require.context("@/assets/images", true);

const InventoryItem = ({ item, index, quantity, inventoryType }) => {
  const context = useContext(AppContext);

  let { type } = context.store.inventory;

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
  const isKeyHouse = item.name.includes("keyhouse");

  const renderCount = () => {
    let count = item.count;

    switch (item.type) {
      case "item_weapon":
        return (
          <>
            {count !== 0 && (
              <>
                <img src={bulletIcon} />
                <span>{item.count}</span>
              </>
            )}
          </>
        );

      case "item_account":
      case "item_money":
        return <>{formatMoney(item.count)}$</>;
    }

    return <>{count}</>;
  };

  return (
    // has-items
    <div
      style={{ opacity }}
      className="inventory_wrapper slot border border-solid border-gta-blue-300 relative w-28 space-y-2 rounded-lg"
    >
      <div className="item-information flex items-center justify-between text-xs px-2 pt-1">
        <div
          className={`item-count inline-flex items-center space-x-1 ${
            item.type === "item_money" && "ml-auto"
          }`}
        >
          {renderCount()}
        </div>

        {item.type !== "item_money" && item.type !== "item_account" && (
          <div className="item-count item-weight">{item.weight}</div>
        )}
      </div>

      <div
        id={`${inventoryType === "main" ? "item" : "itemOther"}-${index}`}
        data-item={JSON.stringify(item)}
        data-inventory={inventoryType}
      >
        <img
          ref={drag}
          className="item w-14 object-contain object-center mx-auto"
          src={isKeyHouse ? keyhouseImg : itemImages(`./${item.name}.png`)}
          alt="image"
        />
      </div>

      <div className="item-name text-center uppercase text-xs font-semibold border-t border-solid border-gta-blue-300 py-1.5">
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
