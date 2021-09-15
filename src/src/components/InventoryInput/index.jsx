import {
  toggleNearPlayers,
  updateQuantity,
} from "@/store/slices/InventorySlice";
import { fetchAPI } from "@/utils";
import { DROP_ITEM, GIVE_ITEM, USE_ITEM } from "@/utils/constant";
import { InputNumber } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InventoryButton from "../InventoryButton";
import "./style.scss";

const inventoryButtons = [
  {
    dropName: USE_ITEM,
    label: "Dùng",
  },
  {
    dropName: GIVE_ITEM,
    label: "Gửi",
  },
  {
    dropName: DROP_ITEM,
    label: "Vứt",
  },
];

const InventoryInput = (props) => {
  const { quantity, dataItem, nearPlayers, isNearPlayersShow } = useSelector(
    (state) => state.inventorySlice
  );

  const dispatch = useDispatch();

  const handleOnChange = (value) => {
    dispatch(updateQuantity(parseInt(value)));
  };

  const handleClickPlayer = (player) => {
    const bodyHeader = {
      item: dataItem,
      number: parseInt(quantity),
      player,
    };

    fetchAPI(GIVE_ITEM, bodyHeader);
    dispatch(toggleNearPlayers());
  };

  const closeNearPlayer = () => {
    dispatch(toggleNearPlayers());
  };

  return (
    <div className="w-full text-lg px-5 py-12 rounded-lg max-w-230 max-h-400 overflow-y-auto hide-scrollbar">
      {isNearPlayersShow ? (
        <div
          id="nearPlayers"
          className={`flex flex-col space-y-5 transition-all duration-100 ease-in-out ${
            isNearPlayersShow
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="nearbyPlayerButton border border-solid border-gta-blue-400 py-2 rounded-lg inline-flex items-center justify-center cursor-pointer"
            onClick={closeNearPlayer}
          >
            Thoát
          </div>

          {nearPlayers?.map((player, index) => (
            <div
              key={player.idcard}
              className="nearbyPlayerButton text-white inline-flex items-center justify-center text-base border-2 border-solid border-gray-800 py-3 rounded-lg transition-all duration-100 ease-in-out bg-gta-blue-400 bg-opacity-50 hover:bg-opacity-100 cursor-pointer"
              data-player={player.player}
              onClick={() => handleClickPlayer(player)}
            >
              [{player.idcard}] {player.label}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-5">
          <InputNumber
            className="w-full text-center border-gta-blue-400 rounded-lg"
            min={1}
            defaultValue={quantity}
            onChange={handleOnChange}
          />

          <div className="flex flex-col space-y-5">
            {inventoryButtons?.map((button, index) => (
              <InventoryButton key={index} dropName={button.dropName}>
                {button.label}
              </InventoryButton>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

InventoryInput.propTypes = {};

export default InventoryInput;
