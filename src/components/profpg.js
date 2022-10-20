import React from "react";
import { Link } from "react-router-dom";
import './profpg.css';
import Center from "./center";
import { useMoralis } from "react-moralis";


const Profpg = () => {
  const { Moralis} = useMoralis();
  const user = Moralis.User.current();

  return (
    <>
    <div className="pageIdentify">Profile</div>
    <div className="pfpContainer">
      <div className="profileName">{user.attributes.username.slice(0, 6)}</div>
      <div className="profileWallet">{`${user.attributes.ethAddress.slice(0, 4)}...
            ${user.attributes.ethAddress.slice(38)}`}</div>
      <Link to="/settings">
          <div className="profileEdit">Edit profile</div>
      </Link>
      <div className="profileBio">
      {user.attributes.bio}
      </div>
      <div className="profileTabs">
          <div className="profileTab">
          Your Tweets
          </div>
      </div>
    </div>
    <Center profile={true}></Center>
    </>
  );
};

export default Profpg;
