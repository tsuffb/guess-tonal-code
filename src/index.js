import React from "react";
import ReactDOM from "react-dom/client"; // Use the new createRoot API
import App from "./App.jsx";
import "./assets/styles/index.css";

// Create the root and render the App component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
