import React from "react";
import './side.css';
import { Cog } from 'web3uikit';
import { Twitter } from 'web3uikit';
import { User } from 'web3uikit';
import { List } from 'web3uikit';
import { Link } from 'react-router-dom';


const side = () => {
  

  return (
    <>
      <div className="siderContent">
        <div className="menu">
          <div className="details">
            <Twitter fill = "#ffffff" size = {95}/>
          </div>

          <Link to='/' className="link">
            <div className="menuItems">
              <List fill = "#ffffff" size = {95}/>
              Home
            </div>
          </Link>

          <Link to='/profpg' className="link">
            <div className="menuItems">
              <User fill = "#ffffff" size = {95}/>
              Profile
            </div>
          </Link>

          <Link to='/setting' className="link">
            <div className="menuItems">
              <Cog fill = "#ffffff" size = {95}/>
              Settings
            </div>
          </Link>

        </div>
      </div>
    </>
  );
};

export default side;
