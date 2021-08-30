import keyhouseImg from "@/assets/images/KeyHouse.png";
import React from "react";
import { useSelector } from "react-redux";

const itemImages = require.context("@/assets/images", true);

// const notiData = {
//   itemname: event.data.itemname,
//   itemlabel: event.data.itemlabel,
//   itemcount: event.data.itemcount,
//   itemremove: event.data.itemremove,
// };

const Notificacao = () => {
  const { notificationData } = useSelector((state) => state.inventorySlice);

  const isKeyHouse = notificationData.itemname?.includes("keyhouse");

  // set alert time

  return (
    <div id="notificacao" className="">
      {/* <div
        className="slot space-y-3"
        style={{ backgroundColor: "rgba(255, 166, 0, 0)" }}
        id="noti"
      >
        <div className="item2" style={{ backgroundImage: "url()" }}>
          
        </div>

        <div className="item-count">
          {notificationData.itemremove ? "-" : "+"}
          {notificationData.itemcount}
        </div>
        <div className="item-name">{notificationData.itemlabel}</div>

        {notificationData.itemname && (
          <img
            className="item w-14 object-contain object-center"
            src={
              isKeyHouse
                ? keyhouseImg
                : itemImages(`./${notificationData.itemname}.png`)
            }
            alt="image"
          />
        )}

        <div className="item-name-bg"></div>
      </div> */}

      <div className="flex flex-col justify-between inventory_wrapper slot border border-solid border-gray-800 relative w-28 h-36 space-y-2 rounded-lg  transition-all duration-100 ease-in-out mb-3">
        <div className="item-information flex items-center justify-between text-xs px-2 pt-1">
          <div
            className={`item-count inline-flex items-center space-x-1 ml-auto`}
          >
            {notificationData.itemremove ? "-" : "+"}{" "}
            {notificationData.itemcount}
          </div>
        </div>

        <div>
          <img
            className="item w-14 object-contain object-center mx-auto"
            src={
              isKeyHouse
                ? keyhouseImg
                : itemImages(`./${notificationData.itemname}.png`)
            }
            alt="image"
          />
        </div>

        <div className="item-name w-full text-center uppercase text-xs font-semibold border-t border-solid border-gray-800 py-1.5 px-1">
          {notificationData.itemlabel}
        </div>
      </div>
    </div>
  );
};

export default Notificacao;
