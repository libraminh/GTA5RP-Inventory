import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

let bagIcon = require("@/assets/images/bagIcon.png");

const InvenotoryProgress = ({ typeIcon }) => {
  const { type } = useSelector((state) => state.inventorySlice);

  return (
    <div className="weight-div weight-progress">
      <div className="weight-progress-wrapper">
        <img
          style={{ width: "20px" }}
          src={typeIcon === "bagIcon" ? bagIcon : typeIcon}
          // src={require("@/assets/images/KetSat2.png")}
          alt="icon"
        />
        <span className="weight-progress-text ml-2">6/45KG</span>
      </div>
      <div className="weight-progress-bar"></div>
    </div>
  );
};

export default InvenotoryProgress;
