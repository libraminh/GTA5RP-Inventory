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
  const { isOtherInventoryShow, infoDivText, eventType } = useSelector(
    (state) => state.inventorySlice
  );

  return (
    <div className="flex">
      <figure className="" style={{ width: "35.5vw" }}>
        <InventoryHeading>Kho Của Bạn</InventoryHeading>
        <InventoryPlayer />
      </figure>

      <figure className="flex items-center justify-center w-60">
        <InventoryInput />
      </figure>

      {isOtherInventoryShow && (
        <figure className="" style={{ width: "35.5vw" }}>
          <InventoryHeading>
            <span
              className="text-gta-blue-400"
              dangerouslySetInnerHTML={{
                __html: eventType === "trunk" ? infoDivText : "Kho Khác",
              }}
            />
          </InventoryHeading>

          <InventoryOther />
        </figure>
      )}
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
