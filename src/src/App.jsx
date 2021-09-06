// components
import { Tabs } from "antd";
import React, { useContext, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import Inventory from "./components/Inventory";
import { useInventoryClose } from "./hooks/useInventoryClose";

import {
  hideOtherInventory,
  hideUI,
  hideWeightDiv,
  openUI,
  setDataItem,
  setInfoDivText,
  setInventoryItems,
  setNearPlayer,
  setNotification,
  setOtherInventoryItems,
  setType,
  showOtherInventory,
  showPlayerInventory,
  showWeightDiv,
  toggleIsUIShow,
} from "./store/slices/InventorySlice";
import "./style.scss";

const { TabPane } = Tabs;

window.Config = new Object();
window.Config.closeKeys = [27];
// Array of keys used to close inventory. Default ESC and F2. Check https://keycode.info/ to get your key code
//LANGUAGE CAN BE CHANGED IN ui.html, SEARCH FOR <script src="locales/en.js"></script> AND CHANGE IT THERE

const App = (props) => {
  const { otherInventory, disabled, isInventoryShow, isUIShow } = useSelector(
    (state) => state.inventorySlice
  );
  const dispatch = useDispatch();

  const { closeInventory } = useInventoryClose();

  const handleDisplay = (type) => {
    switch (type) {
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

      default:
        break;
    }

    // $(".ui").show("slide", { direction: "left" }, 100);

    console.log("openUI ne");

    dispatch(openUI());
    // dispatch(showPlayerInventory());
  };

  const handleMessageEvent = (event) => {
    console.log("event", event);

    dispatch(setType(event.data.type));
    const eventAction = event.data.action;

    switch (eventAction) {
      case "display":
        let type = event.data.type;
        // disabled = false;

        // handleDisplay(type);
        // dispatch(openUI());
        break;

      case "hide":
        dispatch(hideUI());
        break;

      case "setItems":
        console.log("a setItems");
        dispatch(setInventoryItems(event.data.itemList));
        dispatch(openUI());
        break;

      case "setSecondInventoryItems":
        dispatch(setOtherInventoryItems(event.data.itemList));
        break;

      case "setShopInventoryItems":
        dispatch(setOtherInventoryItems(event.data.itemList));
        break;

      case "setInfoText":
        dispatch(setInfoDivText(event.data.text));
        break;

      case "setWeightText":
        // doing setWeightText
        // $(".weight-div").html(event.data.text);
        break;

      case "nearPlayers":
        // doing nearPlayers
        // dispatch(setDataItem(event.data.item));
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

      default:
        console.log("default");
        break;
    }
  };

  useEffect(() => {
    console.log("handleMessageEvent");

    window.addEventListener("message", handleMessageEvent);
    return () => window.removeEventListener("message", handleMessageEvent);
  }, []);

  useEffect(() => {
    document.querySelector("body").addEventListener("keyup", (key) => {
      console.log("keyup close");
      if (window.Config.closeKeys.includes(key.which)) {
        console.log("close diii");

        closeInventory();
      }
    });
  }, []);

  useEffect(() => {
    console.log("isInventoryShow", isInventoryShow);
  }, [isInventoryShow]);

  useEffect(() => {
    console.log("isUIShow", isUIShow);
  }, [isUIShow]);

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
    </DragDropContext>
  );
};

App.propTypes = {};

export default App;
