import React, { useState, useEffect } from "react";
import Box from "./Box";
import Tweets from "./Tweets";
import "./Center.css";
import FlipMove from "react-flip-move";
import axios from 'axios';
import { TwitterDeployAddress } from './config.js';
import {ethers} from 'ethers';
import Twitter from './utils/Twitter.json'


function Center({personal}) {
  const [posts, setPosts] = useState([]);

  const getUpdatedTweets = (allTweets, address) => {
    let updatedTweets = [];
    // Here we set a personal flag around the tweets
    for(let i=0; i<allTweets.length; i++) {
      if(allTweets[i].uname.toLowerCase() == address.toLowerCase()) {
        let tweet = {
          'id': allTweets[i].id,
          'text': allTweets[i].text,
          'deleted': allTweets[i].deleted,
          'uname': allTweets[i].uname,
          'personal': true
        };
        updatedTweets.push(tweet);
      } else {
        let tweet = {
          'id': allTweets[i].id,
          'text': allTweets[i].text,
          'deleted': allTweets[i].deleted,
          'uname': allTweets[i].uname,
          'personal': false
        };
        updatedTweets.push(tweet);
      }
    }
    return updatedTweets;
  }

  const getAllTweets = async() => {
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

        let allTweets = await TwitterContract.getTweets();
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllTweets();
  }, []);

  const deleteTweet = key => async() => {
    console.log(key);

   try {
      const {ethereum} = window

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterDeployAddress,
          Twitter.abi,
          signer
        );

        let deleteTweetTx = await TwitterContract.deleteTweet(key, true);
        let allTweets = await TwitterContract.getTweets();
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }

    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <Box />

      <FlipMove>
        {posts.map((post) => (
          <Tweets
            key={post.id}
            displayName={post.uname}
            text={post.text}
            personal={post.personal}
            onClick={deleteTweet(post.id)}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Center;