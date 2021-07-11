import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import Navbar from "../Navbar/NavbarShow";

//api
import { isAuthenticate } from "../../api/auth.js";
import { getTweet, putTweetLike, putTweetUnlike } from "../../api/tweet";

//css
import "./SingleTweet.css";

const SingleTweet = () => {
 
  let [tweet, setTweet] = useState({});
  let [author, setAuthor] = useState({});
  let [error, setError] = useState(0);

  //url params
  const params = useParams();

  //get user info
  const { user, token } = isAuthenticate();

  //get tweet data
  useEffect(() => {
    let id = Object.values(params);
    getTweet(id[0], token).then((data) => {
      if (data.error) {
        setError(data.error);

      } else {
        setTweet(data.tweet);
        setAuthor(data.tweet.author);
        setError(0);
      }
    });
  }, []);

  //add like to the post
  let like = () => {
    putTweetLike(tweet._id, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setTweet(data.tweet);
      }
    });
  };

  //unlike from like
  let unlike = () => {
    putTweetUnlike(tweet._id, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setTweet(data.tweet);
      }
    });
  };

  //show the like button
  let showLikeButton = () => {
    let isLike = false;

    if (tweet.likes) {
      for (let i = 0; i < tweet.likes.length; i++) {
        if (tweet.likes[i] === user._id) {
          isLike = true;
          break;
        }
      }
    }

    if (isLike) {
      return (
        <FontAwesomeIcon
          className="fa-icon liked"
          onClick={() => unlike()}
          icon={faThumbsUp}
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          className="fa-icon"
          onClick={() => like()}
          icon={faThumbsUp}
        />
      );
    }
  };

  //show single tweet
  let showSingleTweet = () => {
    return (
      <Container>
        <Row>
          <Col md={8} className="offset-md-2">
            <h3 className="text-info">Tweet</h3>
           
             {error ? <h6 className="alert alert-danger">{error}</h6> : ''}

            <div className="tweetBox">
              <p className="tweetText">{tweet.text} </p>
              <span className="ml-5 tweetAuthor"> - @{author.username}</span>

              <div className="inline mt-3">
                <span>
                  Total Likes: {tweet.likes ? tweet.likes.length : 0}{" "}
                </span>
                <span className="float-right">
                  Posted: {moment(tweet.createdAt).fromNow()}
                </span>
              </div>

              <p>{showLikeButton()}</p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  };


  return (
    <>
      <Navbar></Navbar>
      {showSingleTweet()}
    </>
  );
};

export default SingleTweet;
