import React from "react";

import "./style.scss";

let bagIcon = "https://nuocbinh.com/logo-icon-balo-white.png";

const InvenotoryProgress = () => {
  return (
    <div className="weight-div weight-progress">
      <div className="weight-progress-wrapper">
        <img style={{ width: "20px" }} src={bagIcon} alt="icon" />
        <span className="weight-progress-text ml-2">6,101/45,000G</span>
      </div>
      <div className="weight-progress-bar"></div>
    </div>
  );
};

export default InvenotoryProgress;
