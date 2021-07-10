import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../Navbar/NavbarShow";
import { Link, useParams } from "react-router-dom";

//api method
import { getOtherProfile } from "../../api/user";
import { isAuthenticate } from "../../api/auth.js";

const OtherUser = () => {
  let [error, setError] = useState(0);
  let [success, setSuccess] = useState(0);
  let [otherUserInfo, setOtherUserInfo] = useState({});
  let [otherUserTweets, setOtherUserTweets] = useState([]);
  //get user info
  const { user, token } = isAuthenticate();

  //url params
  const params = useParams();

  //get user info
  useEffect(() => {
    //console.log(params)
    getOtherProfile(params, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        setError(data.error);
        setSuccess(0);
      } else {
        console.log(data);
        console.log("Success");
        setOtherUserInfo(data.user);
        setOtherUserTweets(data.tweets);
      }
    });
  }, []);

  let showTweets = (tweets) => (
    <Container>
      <Row>
        {tweets.map((t, i) => {
          return (
            <Col key={i} md={12}>
              <div className="inline">
                <h5 className="text-success">{t.text}</h5>

                <button className="float-right btn btn-outline-info">
                  View Details
                </button>

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
        <Col md={4}>
          <h3 className="text-info">User Name: {otherUserInfo.username}</h3>
          <Row>
            <Col md={6} className="text-center">
              <h5>
                {" "}
                {otherUserInfo.following ? otherUserInfo.following.length : 0}
              </h5>
              <h5>Following</h5>
            </Col>
            <Col md={6} className="text-center">
              <h5>
                {otherUserInfo.followers ? otherUserInfo.followers.length : 0}
              </h5>
              <h5>Followers</h5>
            </Col>
            <Col md={12}>
                <button className="btn btn-outline-warning float-right">Follow</button>
            </Col>
          </Row>
        </Col>


        <Col md={8}>

          <h4>{otherUserInfo.username}'s All Tweets</h4>
          <h5>Total: {otherUserTweets ? otherUserTweets.length : 0}</h5>
          <hr />

          {otherUserTweets ? showTweets(otherUserTweets) : ""}
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

export default OtherUser;
