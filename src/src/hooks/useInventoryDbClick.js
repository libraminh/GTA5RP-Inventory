import { fetchAPI } from "@/utils";
import { PLAYER_ITEM, USE_ITEM } from "@/utils/constant";
import React from "react";
import { useInventoryClose } from "./useInventoryClose";
import { notification } from "antd";
import Notificacao from "@/components/Notificacao";
import { Provider } from "react-redux";
import { store } from "..";

const placement = "bottomLeft";

export const useInventoryDbClick = () => {
  const renderNotificacao = () => {
    return (
      <Provider store={store}>
        <Notificacao />
      </Provider>
    );
  };
  const openNotification = () => {
    notification.open({
      message: "",
      placement,
      duration: 450,
      style: {
        width: "180px",
        background: "transparent",
        padding: 0,
        margin: 0,
      },
      getContainer: () => document.querySelector(".app-wrapper"),
      description: renderNotificacao(),
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  const { closeInventory } = useInventoryClose();

  const handleDoubleClick = (e, { item, fromItem }) => {
    e.preventDefault();

    if (!item.usable || fromItem !== PLAYER_ITEM) return;

    openNotification();

    fetchAPI(USE_ITEM, item);

    closeInventory();
  };

  return {
    handleDoubleClick,
  };
};
