import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { toggleInventoryConfirm } from "@/store/slices/InventorySlice";
import { fetchAPI } from "@/utils";
import { DROP_ITEM } from "@/utils/constant";

const InventoryConfirm = (props) => {
  const { itemBeingDragged, quantity } = useSelector(
    (state) => state.inventorySlice
  );
  const dispatch = useDispatch();

  const handleNo = () => {
    dispatch(toggleInventoryConfirm());
  };

  const handleYes = () => {
    fetchAPI(DROP_ITEM, {
      item: itemBeingDragged,
      number: parseInt(quantity),
    });
    dispatch(toggleInventoryConfirm());
  };

  return (
    <div className="w-full text-lg px-5 py-12 rounded-lg max-w-230 max-h-400 overflow-y-auto hide-scrollbar">
      <div className="flex flex-col space-y-5 transition-all duration-100 ease-in-out">
        <h2 className="text-xl text-gta-blue-400 text-center font-bold">
          Xác Nhận
        </h2>

        <div
          className="nearbyPlayerButton text-center text-white inline-flex items-center justify-center text-base border-2 border-solid border-gray-800 px-1 py-3 rounded-lg transition-all duration-100 ease-in-out bg-gta-blue-400 bg-opacity-50 hover:bg-opacity-100 cursor-pointer"
          onClick={handleYes}
        >
          Có
        </div>

        <div
          className="nearbyPlayerButton text-center text-white inline-flex items-center justify-center text-base border-2 border-solid border-gray-800 px-1 py-3 rounded-lg transition-all duration-100 ease-in-out bg-gta-blue-400 bg-opacity-50 hover:bg-opacity-100 cursor-pointer"
          onClick={handleNo}
        >
          Không
        </div>
      </div>
    </div>
  );
};

InventoryConfirm.propTypes = {};

export default InventoryConfirm;
