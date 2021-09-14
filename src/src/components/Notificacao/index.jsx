import { removeNotification } from "@/store/slices/InventorySlice";
import { keyhouseImg } from "@/utils/constant";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ItemLabel from "../ItemLabel";

const Notificacao = ({ noti }) => {
  const dispatch = useDispatch();
  const isKeyHouse = noti.itemname?.includes("keyhouse");

  useEffect(() => {
    let timeoutID = setTimeout(() => {
      dispatch(removeNotification(noti));
    }, 2000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [noti]);

  return (
    <div className="notificacao">
      <div className="bg-black bg-opacity-40 flex flex-col justify-between inventory_wrapper slot border border-solid border-gray-800 relative h-36 w-24 space-y-2 rounded-lg  transition-all duration-100 ease-in-out active-drop">
        <div className="item-information flex items-center justify-between text-xs px-2 pt-1">
          <div
            className={`item-count inline-flex items-center space-x-1 ml-auto`}
          >
            {noti.itemremove ? "-" : "+"}
            {noti.itemcount}
          </div>
        </div>

        <div>
          <img
            className="item w-14 object-contain object-center mx-auto"
            src={
              isKeyHouse
                ? keyhouseImg
                : `/build/static/media/${noti.itemname}.png`
            }
            alt="image"
          />
        </div>

        <ItemLabel>{noti.itemlabel}</ItemLabel>
      </div>
    </div>
  );
};

export default Notificacao;
