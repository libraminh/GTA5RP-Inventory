import { updateQuantity } from "@/store/slices/InventorySlice";
import { fetchAPI } from "@/utils";
import { DROP_ITEM, GIVE_ITEM, PLAYER_ITEM, USE_ITEM } from "@/utils/constant";
import { InputNumber } from "antd";
import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import InventoryButton from "../InventoryButton";
import "./style.scss";

const InventoryInput = (props) => {
  const { quantity, dataItem, nearPlayers } = useSelector(
    (state) => state.inventorySlice
  );

  const dispatch = useDispatch();

  const handleOnChange = (value) => {
    dispatch(updateQuantity(parseInt(value)));
  };

  const handleClickPlayer = (player) => {
    console.log("player", player);

    const bodyHeader = {
      item: dataItem,
      number: parseInt(quantity),
      player,
    };

    fetchAPI(GIVE_ITEM, bodyHeader);
  };

  return (
    <div className="w-full text-lg px-5 py-12 rounded-lg max-w-230">
      {nearPlayers.length !== 0 ? (
        <div id="nearPlayers" className="flex flex-col space-y-5">
          {nearPlayers?.map((player, index) => (
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
            defaultValue={1}
            onChange={handleOnChange}
          />

          <div className="flex flex-col space-y-5">
            <InventoryButton dropName={USE_ITEM}>Dùng</InventoryButton>
            <InventoryButton dropName={GIVE_ITEM}>Gửi</InventoryButton>
            <InventoryButton dropName={DROP_ITEM}>Vứt</InventoryButton>
          </div>
        </div>
      )}
    </div>
  );
};

InventoryInput.propTypes = {};

export default InventoryInput;
