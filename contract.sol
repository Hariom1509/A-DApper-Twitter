// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract tweets {

    address public account;
    uint256 private counter;

    constructor() 
    {
        counter = 0;
        account = msg.sender;
     }

    struct tweet 
    {
        address tweeter;
        uint256 id;
        string tweetTxt;
        string tweetImg;
    }

    event tweetCreated 
    (
        address tweeter,
        uint256 id,
        string tweetTxt,
        string tweetImg
    );

    mapping(uint256 => tweet) Tweets;

    function addTweet( string memory tweetTxt, string memory tweetImg ) public payable 
    {
        require(msg.value == (1 ether), "Submit 1 Matic Ether!");
        tweet storage newTweet = Tweets[counter];
        newTweet.tweetTxt = tweetTxt;
        newTweet.tweetImg = tweetImg;
        newTweet.tweeter = msg.sender;
        newTweet.id = counter;
        emit tweetCreated
        (
            msg.sender, 
            counter, 
            tweetTxt, 
            tweetImg
        );
        counter++;
        payable(account).transfer(msg.value);
    }

    function getTweet(uint256 id) public view returns (string memory, string memory, address)
    {
        require(id < counter, "Hmmm... This tweet does not exist!!");

        tweet storage t = Tweets[id];
        return (t.tweetTxt, t.tweetImg, t.tweeter);
    }
}