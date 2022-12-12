import "./styles.css";
import React from "react";
import FileUploader from "./components/FileUploader";
import Visualizer from "./components/Visualizer";
export default function App() {
  return (
    <div className="App">
      <h1>X-Ray Data Visualiser</h1>
      <div className="main">
        <FileUploader />
        <Visualizer />
      </div>
    </div>
  );
}
