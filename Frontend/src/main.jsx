import { createRoot } from "react-dom/client"; // Import createRoot from "react-dom/client" instead of "react-dom"
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext.jsx";

createRoot(document.getElementById("root")).render(
  // Use createRoot instead of ReactDOM.createRoot
  <Router>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </Router>
);
