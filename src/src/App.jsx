// components
import { Tabs } from "antd";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Inventory from "./components/Inventory";
import { useInventoryClose } from "./hooks/useInventoryClose";
import MouseBackEnd from "react-dnd-mouse-backend";
import { usePreview } from "react-dnd-preview";
import { DndProvider } from "react-dnd";

import {
  hideOtherInventory,
  hideUI,
  hideWeightDiv,
  openUI,
  setDataItem,
  setFastItems,
  setFastItemsBE,
  setInfoDivText,
  setInventoryItems,
  setNearPlayer,
  setNotification,
  setOtherInventoryItems,
  setPlayerWeight,
  setTrunkWeight,
  setType,
  showOtherInventory,
  showPlayerInventory,
  showWeightDiv,
  toggleBarWeight,
  toggleIsUIShow,
} from "./store/slices/InventorySlice";
import "./style.scss";
import InventoryItem from "./components/InventoryItem";
import { PLAYER_ITEM } from "./utils/constant";

const { TabPane } = Tabs;

window.Config = new Object();
window.Config.closeKeys = [27];
// Array of keys used to close inventory. Default ESC and F2. Check https://keycode.info/ to get your key code
//LANGUAGE CAN BE CHANGED IN ui.html, SEARCH FOR <script src="locales/en.js"></script> AND CHANGE IT THERE

const MyPreview = () => {
  const { display, itemType, item, style } = usePreview();

  // console.log("{ display, itemType, item, style }", {
  //   display,
  //   itemType,
  //   item,
  //   style,
  // });

  if (!display) {
    return null;
  }
  return (
    <div className="item-list__item" style={style}>
      <InventoryItem
        item={item.item}
        dragType={PLAYER_ITEM}
        fromItem={item.item.fromItem}
      />
    </div>
  );
};

const App = (props) => {
  console.log("app render >>>>");
  const { otherInventory, disabled, isInventoryShow, isUIShow } = useSelector(
    (state) => state.inventorySlice
  );
  const dispatch = useDispatch();

  const { closeInventory } = useInventoryClose();

  const handleDisplay = (eventType) => {
    switch (eventType) {
      case "normal":
        dispatch(hideWeightDiv());
        dispatch(hideOtherInventory());
        break;

      case "trunk":
        dispatch(showOtherInventory());
        dispatch(showWeightDiv());
        break;

      case "Society":
      case "property":
        dispatch(showOtherInventory());
        dispatch(hideWeightDiv());
        break;

      case "player":
      case "shop":
      case "motels":
      case "motelsbed":
      case "glovebox":
      case "vault":
        dispatch(showWeightDiv());
        dispatch(showOtherInventory());
        break;
    }

    dispatch(setType(eventType));
    dispatch(openUI());
    // dispatch(showPlayerInventory());
  };

  const handleMessageEvent = (event) => {
    console.log("handleMessageEvent", event);

    const eventAction = event.data.action;

    switch (eventAction) {
      case "display":
        let eventType = event.data.type;
        // disabled = false;

        handleDisplay(eventType);
        break;

      case "hide":
        dispatch(hideUI());
        break;

      case "setItems":
        dispatch(
          setPlayerWeight({
            weight: event.data.weight,
            maxWeight: event.data.maxWeight,
          })
        );
        dispatch(setFastItemsBE(event.data.fastItems));
        dispatch(setInventoryItems(event.data.itemList));
        break;

      case "setSecondInventoryItems":
        dispatch(setOtherInventoryItems(event.data.itemList));
        break;

      case "setShopInventoryItems":
        dispatch(toggleBarWeight());
        dispatch(setOtherInventoryItems(event.data.itemList));
        break;

      case "setInfoText":
        dispatch(
          setTrunkWeight({
            weight: event.data.trunkWeight,
            maxWeight: event.data.trunkMaxWeight,
          })
        );
        dispatch(setInfoDivText(event.data.text));
        break;

      case "setWeightText":
        // doing setWeightText
        // $(".weight-div").html(event.data.text);
        break;

      case "nearPlayers":
        console.log("nearPlayers");
        // doing nearPlayers
        dispatch(setDataItem(event.data.item));
        dispatch(setNearPlayer(event.data.players));
        break;

      case "notification":
        const notiData = {
          itemname: event.data.itemname,
          itemlabel: event.data.itemlabel,
          itemcount: event.data.itemcount,
          itemremove: event.data.itemremove,
        };

        dispatch(setNotification(notiData));
        break;

      case "showhotbar":
        // doing showhotbar
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleMessageEvent);
    return () => window.removeEventListener("message", handleMessageEvent);
  }, []);

  useEffect(() => {
    document
      .querySelector("body")
      .addEventListener("keyup", (key) => handleKeyUp(key));
    return () =>
      document
        .querySelector("body")
        .addEventListener("keyup", (key) => handleKeyUp(key));
  }, []);

  const handleKeyUp = (key) => {
    if (window.Config.closeKeys.includes(key.which)) {
      closeInventory();
    }
  };

  return (
    <DndProvider backend={MouseBackEnd}>
      {/* } */}
      <div
        className={`ui app-wrapper z-10 transition-all duration-100 ease-in-out ${
          isUIShow
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`tabs-wrapper p-5 min-h-screen min-w-screen transition-all duration-100 ease-in-out ${
            isInventoryShow ? "block" : "hidden"
          }`}
        >
          <Tabs className="left-tabs" tabPosition={"left"} type="card">
            <TabPane tab="Kho Đồ" key="1">
              <Inventory />
            </TabPane>
            <TabPane tab="Chế Tạo" key="2">
              Content of Tab 2
            </TabPane>
            <TabPane tab="Shop" key="3">
              Content of Tab 3
            </TabPane>
          </Tabs>
        </div>
      </div>
      <MyPreview />
    </DndProvider>
  );
};

App.propTypes = {};

export default App;
