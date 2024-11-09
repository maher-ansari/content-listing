// src/App.js
import React from "react";
import "./App.css";
import ContentGrid from "./componets/ContentGrid";

const App = () => {
  console.log('in app')
  return (
    <div className="App">
      <ContentGrid />
    </div>
  );
};

export default App;
