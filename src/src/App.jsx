// components
import { Tabs } from "antd";
import React, { useState } from "react";
import Inventory from "./components/Inventory";
import InventoryFastItems from "./components/InventoryFastItems";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const { TabPane } = Tabs;

const App = (props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-wrapper z-10">
        <div
          className="tabs-wrapper p-5 min-h-screen min-w-screen"
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
