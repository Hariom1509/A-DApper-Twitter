import React from "react";
import { Link } from "react-router-dom";
import './setting.css';


const setting = () => {
  

  return (
    <>
    <Link to="/">
        <div>Home</div>
      </Link>
      <Link to="/profpg">
        <div>Profile</div>
      </Link>

      <Link to="/setting">
        <div>Settings</div>
      </Link>

    </>
  );
};

export default setting;
