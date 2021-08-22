// components
import { Tabs } from "antd";
import React, { useContext, useEffect, useState } from "react";
import Inventory from "./components/Inventory";
import InventoryFastItems from "./components/InventoryFastItems";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppContext } from "./store/appContext";
import { fetchAPI } from "./utils";

const { TabPane } = Tabs;

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
        // doing player type
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
          // doing setShopInventoryItems
          break;

        case "setInfoText":
          // doing setInfoText
          break;

        case "setWeightText":
          // doing setWeightText
          break;

        case "nearPlayers":
          // doing nearPlayers
          break;

        case "notification":
          // doing notification
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
          style={{ background: "#1f1d1d" }}
        >
          <Tabs tabPosition={"left"} type="card">
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
