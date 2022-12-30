import React from "react";
import "./Right.css";

import {
    TwitterTimelineEmbed,
    TwitterShareButton,
    TwitterTweetEmbed
} from 'react-twitter-embed';

import SearchIcon from "@material-ui/icons/Search";

function Right() {
    return (
        <div className="widgets">
            <div className="widgets__input">
                <SearchIcon className="widgets__SearchIcon" />
                <input placeholder="Search Twitter" type = "text" />
            </div>

            <div className="widgets__widgetContainer">
                <h2>What's Happening!!</h2>

                <TwitterTimelineEmbed
                sourceType="profile"
                screenName="elonmusk"
                options={{height:300}}
                />
                <br />
                <TwitterTimelineEmbed
                sourceType="profile"
                screenName="twitter"
                options={{height:300}}
                />
                <br />
                <TwitterTimelineEmbed
                sourceType="profile"
                screenName="bcci"
                options={{height:600}}
                />

            </div>
        </div>
    )
}

export default Right;