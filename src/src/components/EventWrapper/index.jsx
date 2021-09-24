import React from "react";
import PropTypes from "prop-types";
import InventoryHeading from "../InventoryHeading";
import EventList from "../EventList";
import EventContent from "../EventContent";

const EventWrapper = (props) => {
  return (
    <div>
      <div className="flex space-x-10">
        <figure className="" style={{ width: "35.5vw" }}>
          <InventoryHeading>Các Sự Kiện Đang Diễn Ra</InventoryHeading>
          <div className="mb-5 border border-solid border-gray-800 rounded-lg transition-all duration-100 ease-in-out">
            <EventList />
          </div>
        </figure>

        <figure className="" style={{ width: "35.5vw" }}>
          <InventoryHeading>Nội Dung</InventoryHeading>
          <div className="mb-5 border border-solid border-gray-800 rounded-lg transition-all duration-100 ease-in-out">
            <div
              className={`scrollbar-custom w-full flex flex-wrap gap-3 max-h-50vh min-h-50vh overflow-y-auto p-4 pr-1 `}
            >
              <EventContent />
            </div>
          </div>
        </figure>
      </div>
    </div>
  );
};

EventWrapper.propTypes = {};

export default EventWrapper;
