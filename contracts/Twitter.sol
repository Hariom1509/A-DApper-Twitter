// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.4;

contract Twitter{

    event addedTweet(address recep, uint tId);
    event delTweet(uint tId, bool deleted);

    struct Tweet {
        uint id;
        address uname;
        string text;
        string img;
        bool deleted;
    }

    Tweet[] private tweets;

    mapping (uint256=>address) owner;

    function addTweet(string memory text, string memory img, bool deleted) external {
        uint tId = tweets.length;
        tweets.push(Tweet(tId, msg.sender, text, img, deleted));
        owner[tId] = msg.sender;
        emit addedTweet(msg.sender, tId);
    }

    function getTweets() external view returns (Tweet[] memory){
        Tweet[] memory temp = new Tweet[](tweets.length);

        uint c = 0;
        for(uint i=0;i<tweets.length; i++)
        {
            if(tweets[i].deleted == false)
            {
                temp[c] = tweets[i];
                c++;
            }
        }

        Tweet[] memory res = new Tweet[](c);
        for(uint i=0;i<c;i++)
        {
            res[i] = temp[i];
        }

        return res;
    }

    function getUserTweets() external view returns (Tweet[] memory){
        Tweet[] memory temp = new Tweet[](tweets.length);

        uint c = 0;
        for(uint i=0;i<tweets.length;i++)
        {
            if(owner[i] == msg.sender && tweets[i].deleted == false)
            {
                temp[c] = tweets[i];
                c++;
            }
        }

        Tweet[] memory res = new Tweet[](c);
        for(uint i=0;i<c;i++)
        {
            res[i] = temp[i];
        }

        return res;
    }

    function deleteTweet(uint tId, bool deleted) external{
        if(owner[tId] == msg.sender){
            tweets[tId].deleted = deleted;
            emit delTweet(tId, deleted);
        }
    }
}