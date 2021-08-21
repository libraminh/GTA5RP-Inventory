import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setQuantity } from "@/store/slices/GlobalSlice";
import { useDrop } from "react-dnd";
import { AppContext } from "@/store/appContext";

const InventoryInput = (props) => {
  const context = useContext(AppContext);

  const { quantity } = context.store;
  const { updateQuantity } = context.actions;

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "inventory_item",
    drop: () => ({ name: "useInventory" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleOnChange = (e) => {
    updateQuantity(parseInt(e.target.value));
  };

  return (
    <div className="flex flex-col space-y-5 text-lg border border-solid border-gta-blue-300 px-5 py-12 rounded-lg">
      <button
        ref={drop}
        className="border border-solid border-gta-blue-300 py-2 rounded-lg"
      >
        Use
      </button>

      <input
        className="w-full text-black text-center appearance"
        type="number"
        value={quantity}
        onChange={handleOnChange}
      />

      <button className="border border-solid border-gta-blue-300 py-2 rounded-lg">
        Give
      </button>
    </div>
  );
};

InventoryInput.propTypes = {};

export default InventoryInput;
