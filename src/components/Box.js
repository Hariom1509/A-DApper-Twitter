import React, { useState , useEffect } from "react";
import "./Box.css";
import Avatar from 'avataaars';
import { generateRandomAvatarOptions } from './avatars';
import { Button } from "@material-ui/core";
import axios from 'axios';
import { TwitterDeployAddress } from './config.js';
import {ethers} from 'ethers';
import Twitter from './utils/Twitter.json'
import * as fs from 'fs';
import { readFileSync } from "fs";
const Moralis = require("moralis").default;

function Box() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const [avatarOptions, setAvatarOptions] = useState("");
  const [img, setImg] = useState();
  const [val, setVal] = useState(0);
  const [hash, setHash] = useState('null');

  const addTweet = async () => {

    console.log(val);
    console.log(img)

    if(val === 1)
    {
      await Moralis.start({
        apiKey:'HBVuvgRqMHkkgIzBHPnF37cCX5nCo0YiRfj62KTgGy4d7daBalWAZUpnENLLpp3P',
      })

      const res = await Moralis.EvmApi.ipfs.uploadFolder({
        abi: img,
      });

      console.log(res.result);
      setHash(res.result);
    }

    console.log(hash)

    let tweet = {
      'tweetText': tweetMessage,
      'img': hash,
      'isDeleted': false
    };

    try {
      const {ethereum} = window

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterDeployAddress,
          Twitter.abi,
          signer
        )

        let twitterTx = await TwitterContract.addTweet(tweet.tweetText, tweet.img, tweet.isDeleted);

        console.log(twitterTx);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch(error) {
      console.log("Error submitting new Tweet", error);
    }
  }

  const sendTweet = (e) => {
    e.preventDefault();

    addTweet();

    setTweetMessage("");
    setTweetImage("");
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    let avatar = generateRandomAvatarOptions();
    setAvatarOptions(avatar);
  }, []);

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar
            style={{ width: '100px', height: '100px' }}
            avatarStyle='Circle'
            {...avatarOptions }
          />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
          />
        </div>
        <input
          value={tweetImage}
          onChange={(e) => {console.log('The file is', e.target.value);setVal(1);}}
          placeholder="Upload Image"
          type="file"
        />

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default Box;