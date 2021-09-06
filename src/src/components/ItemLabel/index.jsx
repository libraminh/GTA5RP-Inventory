import React from "react";
import PropTypes from "prop-types";

const ItemLabel = ({ children }) => {
  return (
    <div className="item-name w-full text-center uppercase text-xs font-semibold border-t border-solid border-gray-800 p-1.5">
      {children}
    </div>
  );
};

ItemLabel.propTypes = {};

export default ItemLabel;
