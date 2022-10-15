import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Profpg from "./components/profpg";
import Setting from "./components/setting";
import Sidebar from "./components/side";
import Rightbar from "./components/right";
import "./App.css";

const App = () => {

  return (
    <>
    <div className="page">
      <div className="side">
        <Sidebar />
      </div>
      
        <div className="mainWindow">
          <Home />
        </div>
      <div className="right">
        <Rightbar />
      </div>
    </div>
    </>
  );
};

export default App;