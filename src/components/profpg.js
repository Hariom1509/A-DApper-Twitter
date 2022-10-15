import React from "react";
import { Link } from "react-router-dom";
import './profpg.css';


const profpg = () => {
  

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

export default profpg;
