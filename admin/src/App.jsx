import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebaar from "./components/Sidebar/Sidebaar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const App = () => {
  const url = "http://localhost:4000";
  return (
    <div className="bg-neutral-900 min-h-screen">
      <div className="bg-fuchsia-400 bg-[size:20px_20px] opacity-20 blur-[100px] min-h-screen">
        <ToastContainer />
        <Navbar />
        <hr />
        <div className="app-content">
          <Sidebaar />
          <Routes>
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
