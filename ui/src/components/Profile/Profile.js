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
    let [userInfo, setUserInfo] =  useState({});
    let [userTweets, setUserTweets] =  useState([]);
  //get user info
  const { user, token } = isAuthenticate();

  useEffect(() => {
    getProfile(user._id, token).then((data)=>{
        if(data.error){
            setError(data.error);
            setSuccess(0);
        }else{
            console.log(data);
            setUserInfo(data.user);
            setUserTweets(data.tweets);
        }
    });
  },[]);

  let showProfile = () => (
    <Container>
      <Row>
        <Col md={6}>
          <h2>User Name</h2>
          <h3>{user.username}</h3>
        </Col>
        <Col md={3} className="text-center">
          <h2> {user.following ? user.following.length : 0 }</h2>
          <h4>Following</h4>
        </Col>
        <Col md={3} className="text-center">
          <h2>{user.followers ? user.followers.length : 0 }</h2>
          <h4>Followers</h4>
        </Col>
      </Row>
    </Container>
  );
  return (
    <>
      <Navbar></Navbar>
      {showProfile()}
    </>
  );
};

export default Profile;
