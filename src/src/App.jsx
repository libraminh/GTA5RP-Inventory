// components
import { Tabs } from "antd";
import React, { useContext, useEffect, useState } from "react";
import Inventory from "./components/Inventory";
import InventoryFastItems from "./components/InventoryFastItems";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppContext } from "./store/appContext";

const { TabPane } = Tabs;

const App = (props) => {
  const context = useContext(AppContext);

  console.log("context", context);

  let { type, disabled, isInventoryShow } = context.store.inventory;
  let { toggleOtherInventory } = context.actions;

  const handleDisplay = (type) => {
    switch (type) {
      case "normal":
        // doing normal type

        toggleOtherInventory();

        break;
      case "trunk":
        // doing trunk type
        break;
      case "Society":
        // doing Society type
        break;
      case "property":
        // doing property type
        break;
      case "player":
        // doing player type
        break;
      case "shop":
        // doing shop type
        break;
      case "motels":
        // doing motels type
        break;
      case "motelsbed":
        // doing motelsbed type
        break;
      case "glovebox":
        // doing glovebox type
        break;
      case "vault":
        // doing vault type
        break;
      default:
        break;
    }

    // $(".ui").show("slide", { direction: "left" }, 100);
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
          // doing setItems
          break;

        case "setSecondInventoryItems":
          // doing setSecondInventoryItems
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
