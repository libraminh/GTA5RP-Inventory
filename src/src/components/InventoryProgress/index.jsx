import React from "react";

import "./style.scss";

// let bagIcon = require("@/assets/images/bagIcon.png");
let bagIcon = "/build/static/media/bagIcon.png";

const InvenotoryProgress = ({ typeIcon, weightInfo = {} }) => {
  const renderWeight = () => {
    return `${(weightInfo?.weight / 1000).toFixed(2)}/${
      weightInfo?.maxWeight / 1000
    }KG`;
  };

  const progressWeight = () => {
    return (
      (parseInt(weightInfo?.weight) * 100) / parseInt(weightInfo?.maxWeight)
    );
  };

  return (
    <div className="weight-div weight-progress">
      <div className="weight-progress-wrapper">
        <img
          style={{ width: "20px" }}
          src={typeIcon === "bagIcon" ? bagIcon : typeIcon}
          // src={require("@/assets/images/KetSat2.png")}
          alt="icon"
        />
        <span className="weight-progress-text ml-2">{renderWeight()}</span>
      </div>
      <div
        className="weight-progress-bar"
        style={{ width: `${progressWeight()}%` }}
      ></div>
    </div>
  );
};

export default InvenotoryProgress;
