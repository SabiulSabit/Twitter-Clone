import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../Navbar/NavbarShow";
import { Link } from "react-router-dom";

//api method
import { getProfile } from "../../api/user";
import { isAuthenticate } from "../../api/auth.js";

const Profile = () => {
  let [error, setError] = useState(0);
  let [success, setSuccess] = useState(0);
  let [userInfo, setUserInfo] = useState({});
  let [userTweets, setUserTweets] = useState([]);
  //get user info
  const { user, token } = isAuthenticate();
  
  //get user info
  useEffect(() => {
    getProfile(user._id, token).then((data) => {
      if (data.error) {
        setError(data.error);
        setSuccess(0);
      } else {
        
        setUserInfo(data.user);
        setUserTweets(data.tweets);
        console.log(data);
      }
    });
  }, []);

  let showTweets= (tweets) => (
    <Container>
      <Row>
        {tweets.map((t, i) => {
          return (
            <Col key={i} md={12}> 
             <div  className="inline">
              <h3 className="text-success">{t.text.substring(0,10)}...</h3>
           
              <button className="float-right btn btn-outline-info">View Details</button>
              {  t.author === user._id ? <button className="float-right btn btn-outline-danger">Delete</button> : "" }
              
              <hr className="mt-5" />
            </div>
            </Col>
           
          );
        })}
      </Row>
    </Container>
  );

  let showProfile = () => (
    <Container>
      <Row>
        <Col md={6}>
          <h2>User Name</h2>
          <h3>{userInfo.username}</h3>
        </Col>
        <Col md={3} className="text-center">
          <h2> {userInfo.following ? userInfo.following.length : 0}</h2>
          <h4>Following</h4>
        </Col>
        <Col md={3} className="text-center">
         
          <h2>{userInfo.followers ? userInfo.followers.length : 0}</h2>
          <h4>Followers</h4>
        </Col>

        <Col md={12} className="mt-5">
          <hr />
          <h4>{userInfo.username}'s All Tweets</h4>
          <h5>Total: {userTweets ? userTweets.length : 0}</h5>
          <hr />

          {userTweets ? showTweets(userTweets) : ""}
        </Col>
      </Row>
    </Container>
  );
  return (
    <>
      <Navbar></Navbar>
      {showProfile(userInfo)}
    </>
  );
};

export default Profile;
