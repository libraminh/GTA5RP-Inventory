import React from "react";
import PropTypes from "prop-types";
import playersafe from "@/assets/images/playersafe.png";
import advrepairkit from "@/assets/images/advrepairkit.png";

import "./style.scss";

const InventoryFastItem = ({ item, index }) => {
  return (
    <div className="inventoryItem slotFast relative w-26 h-26 flex items-center flex-col border border-solid border-grey-500">
      <div className="keybind absolute right-0 -top-6">{index + 1}</div>
      <div className="item-count absolute top-1 left-2">{item.itemCount}</div>
      <img
        className="w-14 object-contain object-center"
        src={item.image}
        alt="image"
      />

      {/* <div
        id={`itemFast-${index}`}
        className="item bg-no-repeat bg-contain w-20 h-20" // ui-droppable ui-draggable ui-draggable-handle
        style={{ backgroundImage: `url(${playersafe})` }}
      >
        <div className="item-name-bg"></div>
      </div> */}

      <div className="item-name mt-auto">{item.itemName}</div>
      <div className="item-name-bg"></div>
    </div>
  );
};

InventoryFastItem.propTypes = {};

export default InventoryFastItem;
