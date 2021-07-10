import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Navbar from "../Navbar/NavbarShow";
import { getAllProfile } from "../../api/user";
import { isAuthenticate } from "../../api/auth.js";
import { Link } from "react-router-dom";

const AllUser = () => {
  let [error, setError] = useState(0);
  let [success, setSuccess] = useState(0);
  let [usersInfo, setUsersInfo] = useState([]);

  //get user info
  const { token } = isAuthenticate();

  useEffect(() => {
    getAllProfile(token).then((data) => {
      if (data.error) {
        setError(data.error);
        setSuccess(0);
      } else {
        console.log(data.users);
        setUsersInfo(data.users);
      }
    });
  }, []);

  let showUsersCard = (users) => (
    <Container>
      <Row>
        {users.map((user, i) => {
          return (
            <Col md={4} key={i}>
              <Card>
                <Card.Body>
                  <Card.Title>{user.username}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Total Follower:{" "}
                    {user.username.followers
                      ? user.username.followers.length
                      : 0}
                  </Card.Subtitle>
                  
                  <Card.Link as={Link} to={`/profile/${user._id}`}>View Profile</Card.Link>
    
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );

  return (
    <>
      {" "}
      <Navbar></Navbar>
      <Container>
        <Row>
          <Col md={12}>
            <h1>Total User Found: {usersInfo ? usersInfo.length : 0}</h1>
            <hr />
          </Col>
        </Row>
      </Container>
      {usersInfo ? (
        showUsersCard(usersInfo)
      ) : (
        <Container>
          <h3 className="text-warning">No User Found!</h3>{" "}
        </Container>
      )}
    </>
  );
};

export default AllUser;