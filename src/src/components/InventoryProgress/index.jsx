import React from "react";

import "./style.scss";

// let bagIcon = require("@/assets/images/bagIcon.png");
let bagIcon = "/build/static/media/bagIcon.png";

const InvenotoryProgress = ({ typeIcon }) => {
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
