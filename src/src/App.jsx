// components
import { Tabs } from "antd";
import React, { useContext, useEffect, useState } from "react";
import Inventory from "./components/Inventory";
import InventoryFastItems from "./components/InventoryFastItems";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppContext } from "./store/appContext";
import { fetchAPI } from "./utils";

import "./style.scss";
import Notificacao from "./components/Notificacao";

const { TabPane } = Tabs;

{
  /* <div id="nearPlayers">
  <button class="nearbyPlayerButton" data-player="197">
    [3]
  </button>
  <button class="nearbyPlayerButton" data-player="134">
    [4225]
  </button>
  <button class="nearbyPlayerButton" data-player="257">
    [4218]
  </button>
  <button class="nearbyPlayerButton" data-player="48">
    [3080]
  </button>
</div>; */
}

window.Config = new Object();
window.Config.closeKeys = [27]; //Array of keys used to close inventory. Default ESC and F2. Check https://keycode.info/ to get your key code
//LANGUAGE CAN BE CHANGED IN ui.html, SEARCH FOR <script src="locales/en.js"></script> AND CHANGE IT THERE

const App = (props) => {
  const context = useContext(AppContext);

  let { type, disabled, isInventoryShow } = context.store.inventory;

  let {
    toggleOtherInventory,
    toggleWeightDiv,
    hideWeightDiv,
    hideOtherInventory,
    showOtherInventory,
    showWeightDiv,
    setInventoryItems,
    setOtherInventoryItems,
    setInfoDivText,
    setNearPlayer,
    setDataItem,
    setNotification,
  } = context.actions;

  const handleDisplay = (type) => {
    switch (type) {
      case "normal":
        hideWeightDiv();
        hideOtherInventory();
        break;
      case "trunk":
        showOtherInventory();
        showWeightDiv();
        break;

      case "Society":
      case "property":
        showOtherInventory();
        hideWeightDiv();
        break;

      case "player":
      case "shop":
      case "motels":
      case "motelsbed":
      case "glovebox":
      case "vault":
        showWeightDiv();
        showOtherInventory();
        break;

      default:
        break;
    }

    // $(".ui").show("slide", { direction: "left" }, 100);
  };

  const closeInventory = async () => {
    await fetch(
      "http://esx_inventoryhud/NUIFocusOff",
      JSON.stringify({
        type: type,
      })
    );
  };

  useEffect(() => {
    window.addEventListener("message", (event) => {
      const eventAction = event.data.action;

      switch (eventAction) {
        case "display":
          type = event.data.type;
          disabled = false;

          handleDisplay();
          break;

        case "hide":
          // ("#dialog").dialog("close");
          // $(".ui").hide("slide", { direction: "right" }, 100);
          // $(".item").remove();
          break;

        case "setItems":
          setInventoryItems(event.data.itemList);
          // doing setItems
          break;

        case "setSecondInventoryItems":
          // doing setSecondInventoryItems
          setOtherInventoryItems(event.data.itemList);
          break;

        case "setShopInventoryItems":
          setOtherInventoryItems(event.data.itemList);
          break;

        case "setInfoText":
          // doing
          // $(".info-div").html(event.data.text);

          setInfoDivText(event.data.text);
          break;

        case "setWeightText":
          // doing setWeightText
          // $(".weight-div").html(event.data.text);
          break;

        case "nearPlayers":
          // doing nearPlayers
          setDataItem(event.data.item);
          setNearPlayer(event.data.players);
          break;

        case "notification":
          // doing notification

          const notiData = {
            itemname: event.data.itemname,
            itemlabel: event.data.itemlabel,
            itemcount: event.data.itemcount,
            itemremove: event.data.itemremove,
          };

          setNotification(notiData);
          break;

        case "showhotbar":
          // doing showhotbar
          break;

        default:
          break;
      }
    });
  }, []);

  useEffect(() => {
    document.querySelector("body").addEventListener("keyup", (key) => {
      if (window.Config.closeKeys.includes(key.which)) {
        closeInventory();
      }
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-wrapper z-10">
        <div
          className={`tabs-wrapper p-5 min-h-screen min-w-screen transition-all duration-200 ease-in-out ${
            isInventoryShow ? "block" : "hidden"
          }`}
        >
          <Tabs className="left-tabs" tabPosition={"left"} type="card">
            <TabPane tab="Inventory" key="1">
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

      <Notificacao />
    </DndProvider>
  );
};

App.propTypes = {};

export default App;

/* <main className="max-w-6xl mx-auto py-8 px-3">
  <Switch>
    <Route path="/" exact component={Home} />
  </Switch>
</main> */
