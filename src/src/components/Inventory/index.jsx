import React from "react";
import PropTypes from "prop-types";
import InventoryPlayer from "../InventoryPlayer";
import { Tabs } from "antd";
import InventoryInput from "../InventoryInput";
import InventoryOther from "../InventoryOther";
import InventoryFastItems from "../InventoryFastItems";

const { TabPane } = Tabs;

const InventoryPlayerWrapper = () => {
  return (
    <div>
      <div className="grid grid-cols-5 gap-10">
        <figure className="col-span-2">
          <h2 className="text-xl mb-5 border-b border-t border-solid border-gta-blue-300 pb-1 pt-0.5 px-5 inline-block">
            Kho Của Bạn
          </h2>
          <InventoryPlayer />
        </figure>

        <figure className="col-span-1 flex items-center justify-center">
          <InventoryInput />
        </figure>

        <figure className="col-span-2">
          <h2 className="text-xl mb-5 border-b border-t border-solid border-gta-blue-300 pb-1 pt-0.5 px-5 inline-block">
            Kho Khác
          </h2>
          <InventoryOther />
        </figure>
      </div>

      <InventoryFastItems />
    </div>
  );
};

const Inventory = (props) => {
  return (
    <div>
      <Tabs type="card">
        <TabPane tab="Kho Đồ" key="1">
          <InventoryPlayerWrapper />
        </TabPane>
        <TabPane tab="Trang Bị" key="2">
          Content of Tab 2
        </TabPane>
        <TabPane tab="Balo" key="3">
          Content of Tab 3
        </TabPane>
      </Tabs>
    </div>
  );
};

Inventory.propTypes = {};

export default Inventory;
