import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../Navbar/NavbarShow";
import HomeSingleTweet from "../HomeSingleTweet/HomeSingleTweet";

//api method
import { isAuthenticate } from "../../api/auth";
import { getTweets } from "../../api/tweet";

//css
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  let [error, setError] = useState(0);
  let [success, setSuccess] = useState(0);
  let [allTweets, setallTweets] = useState([]);

  //get user info
  const { user, token } = isAuthenticate();

  //get user info
  useEffect(() => {
    getTweets(token).then((data) => {
      if (data.error) {
        setError(data.error);
        setSuccess(0);
      } else {
        setSuccess(1);
        setError(0);
        setallTweets(data.tweets);

      }
    });
  }, []);

  let showTweets = () => {
    return  allTweets ? allTweets.map( (t,  i) =>  { return (<HomeSingleTweet key={i} tweet={t}></HomeSingleTweet>)} ) : <h1>No Tweet Found</h1> ;
  };

  let showWelcomeMsg = () => {
      return       <Container>
      <Row>
        <Col md={8} className="offset-md-2 text-center">
            <h1>Welcome to Twitter Clone</h1>
            <h3>Please <Link to={"/signin"}> Login </Link>for procced</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages</p>
        </Col>
      </Row>
    </Container>

  }

  return (
    <div>
      <Navbar></Navbar>

      { user ? showTweets() : showWelcomeMsg() }

    </div>
  );
};

export default Home;
