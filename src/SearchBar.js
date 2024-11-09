// src/components/SearchBar.js
import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search content"
      value={value}
      onChange={onChange}
      className="search-bar"
    />
  );
};

export default SearchBar;
