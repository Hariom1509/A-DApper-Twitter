import React from "react";
import "./Left.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import LeftOption from "./LeftOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";

function Left() {

  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar__twitterIcon" />
      <script>{console.log('insideLEFT')}</script>

      <LeftOption Icon={HomeIcon} text="Home" />
      <LeftOption Icon={SearchIcon} text="Explore" />
      <LeftOption Icon={NotificationsNoneIcon} text="Notifications" />
      <LeftOption Icon={MailOutlineIcon} text="Messages" />
      <LeftOption Icon={BookmarkBorderIcon} text="Bookmarks" />
      <LeftOption Icon={ListAltIcon} text="Lists"/>
      <LeftOption Icon={PermIdentityIcon} text="Profile"/>
      <LeftOption Icon={MoreHorizIcon} text="More" />

      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>
    </div>
  );
}

export default Left;