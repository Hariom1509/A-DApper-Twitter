import React from "react";
import "./home.css";
import { TextArea, Image, Matic } from "web3uikit";
import { useState, useRef } from "react";
import Center from "./center";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

const Home = () => {

  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const contractProcessor = useWeb3ExecuteFunction();

  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [theFile, setTheFile] = useState();
  const [tweet, setTweet] = useState();

  async function maticTweet() {

    if (!tweet) return;

    let img;
    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      img = file.ipfs();
    }else{
      img = "No Img"
    }

    let options = {
      contractAddress: "0xA5eDcFccfD6b8A197aB31CfA3c234Ad3bcB9c294",
      functionName: "addTwt",
      abi: [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "text",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "img",
                    "type": "string"
                }
            ],
            "name": "create",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "account",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "text",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "img",
                    "type": "string"
                }
            ],
            "name": "addTwt",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "getTwt",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ],
      params: {
        tweetTxt: tweet,
        tweetImg: img,
      },
      msgValue: Moralis.Units.ETH(1),
    }

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        saveTweet();
      },
      onError: (error) => {
        console.log(error.data.message)
      }
    });

  }


  async function saveTweet() {

    if(!tweet) return;

    const Tweets = Moralis.Object.extend("Tweets");

    const newTweet = new Tweets();

    newTweet.set("tweetTxt", tweet);
    newTweet.set("tweeterPfp", user.attributes.pfp);
    newTweet.set("tweeterAcc", user.attributes.ethAddress);
    newTweet.set("tweeterUserName", user.attributes.username);

    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      newTweet.set("tweetImg", file.ipfs());
    }

    await newTweet.save();
    window.location.reload();

  }

  const onImageClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  return (
    <>
    <div className="pageIdentify">Home</div>
      <div className="mainContent">
        <div className="profileTweet">
          <div className="tweetBox">
            <TextArea
              label=""
              name="tweetTxtArea"
              value="GM World"
              type="text"
              onChange={(e) => setTweet(e.target.value)}
              width="95%"
            ></TextArea>
            {selectedFile && (
              <img src={selectedFile} className="tweetImg"></img>
            )}
            <div className="imgOrTweet">
              <div className="imgDiv" onClick={onImageClick}>
              <input
                  type="file"
                  name="file"
                  ref={inputFile}
                  onChange={changeHandler}
                  style={{ display: "none"}}
                />
                <Image fill="#1DA1F2" size={20} />
              </div>
              <div className="tweetOptions">
                <div className="tweet" onClick={saveTweet}>Tweet</div>
                <div className="tweet" onClick={maticTweet} style={{ backgroundColor: "#8247e5" }}>
                  <Matic fill="#ffffff" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Center profile={false}/>
      </div>
    </>
  );
};

export default Home;