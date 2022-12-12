import React from "react";

const DropDown = ({ getFilterCoffee, getTurkishCoffee }) => {
  return (
    <div className="sort-of-the-coffee">
      <h6 onClick={getFilterCoffee}>Filter Coffee</h6>
      <h6 onClick={getTurkishCoffee}>Turkish Coffee</h6>
    </div>
  );
};

export default DropDown;
