import { AppContext } from "@/store/appContext";
import React, { useContext } from "react";
import InventoryItem from "../InventoryItem";
import keyhouseImg from "@/assets/images/KeyHouse.png";

const itemImages = require.context("@/assets/images", true);

// const notiData = {
//   itemname: event.data.itemname,
//   itemlabel: event.data.itemlabel,
//   itemcount: event.data.itemcount,
//   itemremove: event.data.itemremove,
// };

const Notificacao = () => {
  const context = useContext(AppContext);

  let { notificationData } = context.store;

  const isKeyHouse = notificationData.itemname?.includes("keyhouse");

  // set alert time

  return (
    <div id="notificacao">
      <div
        className="slot"
        style={{ backgroundColor: "rgba(255, 166, 0, 0)" }}
        id="noti"
      >
        <div className="item2" style={{ backgroundImage: "url()" }}>
          <div className="item-count">
            {notificationData.itemremove ? "-" : "+"}
            {notificationData.itemcount}
          </div>
          <div className="item-name">{notificationData.itemlabel}</div>
        </div>

        {notificationData.itemname && (
          <img
            className="item w-14 object-contain object-center mx-auto"
            src={
              isKeyHouse
                ? keyhouseImg
                : itemImages(`./${notificationData.itemname}.png`)
            }
            alt="image"
          />
        )}

        <div className="item-name-bg"></div>
      </div>

      {/* <InventoryItem item={item} index={index} /> */}
    </div>
  );
};

export default Notificacao;
