import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setQuantity } from "@/store/slices/GlobalSlice";
import { useDrop } from "react-dnd";
import { AppContext } from "@/store/appContext";
import { InputNumber } from "antd";

import "./style.scss";
import { fetchAPI } from "@/utils";
import { FETCH_URL, GIVE_ITEM } from "@/utils/constant";
import InventoryButton from "../InventoryButton";

const InventoryInput = (props) => {
  const context = useContext(AppContext);

  const { quantity, inventory } = context.store;
  const { updateQuantity } = context.actions;

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "inventory_item",
    drop: () => ({ name: "useInventory" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const handleOnChange = (value) => {
    updateQuantity(parseInt(value));
  };

  const handleClickPlayer = (player) => {
    console.log("player", player);

    const bodyHeader = {
      item: inventory.dataItem,
      number: parseInt(quantity),
      player,
    };

    fetchAPI(GIVE_ITEM, bodyHeader);
  };

  const isActive = canDrop && isOver;

  let isDropHover = false;

  if (isActive) {
    isDropHover = true;
  } else if (canDrop) {
    // backgroundColor = "red";
  }

  return (
    <div className="w-full text-lg px-5 py-12 rounded-lg max-w-230">
      {inventory.nearPlayers.length !== 0 ? (
        <div id="nearPlayers" className="flex flex-col space-y-5">
          {inventory.nearPlayers?.map((player, index) => (
            <button
              key={player.idcard}
              className="nearbyPlayerButton border border-solid border-gta-blue-300 py-2 rounded-lg"
              data-player={player.player}
              onClick={() => handleClickPlayer(player)}
            >
              [{player.idcard}]
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-5">
          <InputNumber
            className="w-full text-center border-gta-blue-400 rounded-lg"
            min={1}
            max={10}
            defaultValue={1}
            onChange={handleOnChange}
          />

          <div ref={drop} className="flex flex-col space-y-5">
            <InventoryButton isDropHover={isDropHover}>Dùng</InventoryButton>
            <InventoryButton isDropHover={isDropHover}>Gửi</InventoryButton>
            <InventoryButton isDropHover={isDropHover}>Vứt</InventoryButton>
          </div>
        </div>
      )}
    </div>
  );
};

InventoryInput.propTypes = {};

export default InventoryInput;
