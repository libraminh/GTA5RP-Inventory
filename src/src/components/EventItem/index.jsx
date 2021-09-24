import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setCurrentEvent } from "@/store/slices/EventSlice";

const EventItem = ({ eventItem, setActiveEvent, activeEvent }) => {
  const dispatch = useDispatch();

  const handleCurrentEvent = () => {
    setActiveEvent(eventItem.name);
    dispatch(setCurrentEvent(eventItem.name));
  };

  return (
    <div
      className={`flex flex-col overflow-hidden justify-between inventory_wrapper slot border border-solid border-gray-800 relative w-40 space-y-2 rounded-lg hover-drop transition-all duration-100 ease-in-out cursor-pointer p-2 ${
        activeEvent === eventItem.name ? "active-drop" : ""
      }`}
      onClick={handleCurrentEvent}
    >
      <div>
        <img
          className="w-full h-28 object-cover object-center rounded"
          src={eventItem.image}
          alt="image"
        />
      </div>

      <span className="text-white text-md text-center p-1">
        {eventItem.label}
      </span>
    </div>
  );
};

EventItem.propTypes = {};

export default EventItem;
