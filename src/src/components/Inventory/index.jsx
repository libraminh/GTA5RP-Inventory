import { AppContext } from "@/store/appContext";
import { Tabs } from "antd";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import InventoryFastItems from "../InventoryFastItems";
import InventoryHeading from "../InventoryHeading";
import InventoryInput from "../InventoryInput";
import InventoryOther from "../InventoryOther";
import InventoryPlayer from "../InventoryPlayer";

const { TabPane } = Tabs;

const InventoryPlayerWrapper = () => {
  const { isOtherInventoryShow } = useSelector((state) => state.inventorySlice);

  return (
    <div>
      {/* grid grid-cols-5 gap-10 */}
      <div className="flex">
        <figure className="" style={{ width: "35.5vw" }}>
          <InventoryHeading>Kho Của Bạn</InventoryHeading>
          <InventoryPlayer />
        </figure>

        <figure className="flex items-center justify-center">
          <InventoryInput />
        </figure>

        {isOtherInventoryShow && (
          <figure className="" style={{ width: "35.5vw" }}>
            <InventoryHeading>Kho Khác</InventoryHeading>
            <InventoryOther />
          </figure>
        )}
      </div>
    </div>
  );
};

const Inventory = (props) => {
  const { isFastInventoryShow } = useSelector((state) => state.inventorySlice);

  return (
    <div>
      {/* <Tabs type="card">
        <TabPane tab="Kho Đồ" key="1">
          <InventoryPlayerWrapper />
        </TabPane>
        <TabPane tab="Trang Bị" key="2">
          Content of Tab 2
        </TabPane>
        <TabPane tab="Balo" key="3">
          Content of Tab 3
        </TabPane>
      </Tabs> */}

      <InventoryPlayerWrapper />

      {isFastInventoryShow && <InventoryFastItems />}
    </div>
  );
};

Inventory.propTypes = {};

export default Inventory;
