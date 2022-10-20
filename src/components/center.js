import React from "react";
import "./center.css";
import { MessageCircle, Matic, Star } from "web3uikit";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";

const Center = ({ profile }) => {
  const [tweetArr, setTweetArr] = useState();
  const { Moralis, account } = useMoralis();

  useEffect(() => {
    async function getTweets() {
      try {
        const Tweets = Moralis.Object.extend("Tweets");
        const query = new Moralis.Query(Tweets);
        if (profile) {
          query.equalTo("tweeterAcc", account);
        }
        const results = await query.find();

        setTweetArr(results);
        console.log(results);
      } catch (error) {
        console.error(error);
      }
    }
    getTweets();
  }, [profile]);

  return (
    <>
      {tweetArr?.map((e) => {
        return (
          <>
            <div className="feedTweet">
              <div className="completeTweet">
                <div className="who">
                {e.attributes.tweeterUserName.slice(0, 6)}
                  <div className="accWhen">{
                        `${e.attributes.tweeterAcc.slice(0, 4)}...${e.attributes.tweeterAcc.slice(38)} · 
                        ${e.attributes.createdAt.toLocaleString('en-us', { month: 'short' })}  
                        ${e.attributes.createdAt.toLocaleString('en-us', { day: 'numeric' })}
                        `  
                      }
                      </div>
                </div>
                <div className="tweetContent">
                {e.attributes.tweetTxt}
                {e.attributes.tweetImg && (
                        <img
                          src={e.attributes.tweetImg}
                          className="tweetImg"
                        ></img>
                      )}
                </div>
                <div className="interactions">
                  <div className="interactionNums">
                    <MessageCircle fill="#3f3f3f" size={20} />
                  </div>
                  <div className="interactionNums">
                    <Star fill="#3f3f3f" size={20} />
                    12
                  </div>
                  <div className="interactionNums">
                    <Matic fill="#3f3f3f" size={20} />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }).reverse()}
    </>
  );
};

export default Center;