// src/components/SearchBar.js
import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar-container">
    <button className="back-button" onClick={() => history.goBack()}>
      <img src="https://test.create.diagnal.com/images/Back.png" alt="Back" />
    </button>
    <div className="search-input-container">
      <input
        type="text"
        placeholder="Romantic Comedy"
        value={value}
        onChange={onChange}
        className="search-input"
      />
      <button className="search-button">
        <img src="https://test.create.diagnal.com/images/search.png" alt="Search" />
      </button>
    </div>
  </div>
  );
};

export default SearchBar;
