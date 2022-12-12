import React from "react";

const Searching = ({searchBar, fuzzySearch}) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        onChange={fuzzySearch}
        value={searchBar}
        placeholder="Find name..."
      />
    </div>
  );
};
export default Searching;
