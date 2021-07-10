import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import Navbar from "../Navbar/NavbarShow";

//api
import { isAuthenticate } from "../../api/auth.js";
import { getTweet } from "../../api/tweet";

const SingleTweet = () => {
  let [tweet, setTweet] = useState({});
  let [error, setError] = useState(0);
  let [success, setSuccess] = useState(0);

  //url params
  const params = useParams();

    //get user info
    const { user, token } = isAuthenticate();

  //get tweet data
  useEffect(() => {
    let id = Object.values(params);
    getTweet(id[0], token).then((data)=>{
        if(data.error){
            setError(data.error);
        setSuccess(0);
        }else{
            setTweet(data.tweet)
        }
    })
  }, []);

  let showSingleTweet = () => {
    return (
      <Container>
        <Row>
          <Col md={8} className="offset-md-2">
            <p>{tweet.text}</p>
            <hr />
            <p>Total Likes: {tweet.likes ? tweet.likes.length: 0 }</p>
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
