import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HomeSingleTweet from "../HomeSingleTweet/HomeSingleTweet";

import Navbar from '../Navbar/NavbarShow'

//api method
import { isAuthenticate } from "../../api/auth";
import { getTweets } from "../../api/tweet";

//css
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {

  let [error, setError] = useState(0);
  let [success, setSuccess] = useState(0);
  var [allTweets, setallTweets] = useState([]);
  let [next, setNext] = useState(0);
  let [prev, setPrev] = useState(0);

  //get user info
  const { user, token } = isAuthenticate();

  //get user info
  useEffect(() => {
    if(token){
      getTweets(token).then((data) => {
        if (data.error) {
          setError(data.error);
          setSuccess(0);
        } else {
          setSuccess(1);
          setError(0);
          setallTweets(data.tweets);
          setNext(data.nextPage)
          setPrev(data.prevPage)
        }
      });
    }

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

  let newPage = (page) =>{
    setallTweets([]);
    getTweets(token, page).then((data_new) => {
      if (data_new.error) {
        setError(data_new.error);
        setSuccess(0);
      } else {
        setSuccess(1);
        setError(0);
  
        setallTweets(data_new.tweets);
   
        setNext(data_new.nextPage)
        setPrev(data_new.prevPage)
      }
    });
  }


  let showNext = () => {
    return <button className="btn btn-outline-info ml-2" onClick={ () => newPage(next)}>Next</button>
  }

  let showPrev = () => {
    return <button className="btn btn-outline-info mr-2" onClick={ () => newPage(prev)}>Prev</button>
  } 


  let showPagination = () =>{
    return <Container> 
      <Row>
        <Col md={8} className="offset-md-2 text-center">
          <div className="inline">
              { prev ? showPrev() : "" }
              {next ? showNext() : "" }
          </div>
        </Col>
      </Row>
    </Container>
  }

  return (
    <div>
      <Navbar></Navbar>

      { user ? showTweets() : showWelcomeMsg() }

      {showPagination()}

    </div>
  );
};

export default Home;
