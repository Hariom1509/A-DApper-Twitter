// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract twitter {

    address public account;
    uint256 private twtnum;

    constructor() 
    {
        twtnum = 0;
        account = msg.sender;
     }

    struct twt 
    {
        address owner;
        uint256 id;
        string text;
        string img;
    }

    event create 
    (
        address owner,
        uint256 id,
        string text,
        string img
    );

    mapping(uint256 => twt) twitter;

    function addTwt( string memory text, string memory img ) public payable 
    {
        require(msg.value == (1 ether), "Submit 1 token!");
        twt storage newTwt = twitter[twtnum];
        newTwt.text = text;
        newTwt.img = img;
        newTwt.owner = msg.sender;
        newTwt.id = twtnum;
        emit create
        (
            msg.sender, 
            twtnum, 
            text, 
            img
        );
        twtnum++;
        payable(account).transfer(msg.value);
    }

    function getTwt(uint256 id) public view returns (string memory, string memory, address)
    {
        require(id < twtnum, "404! Tweet Not Found");

        twt storage t = twitter[id];
        return (t.text, t.img, t.owner);
    }
}