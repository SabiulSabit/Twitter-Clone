import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getAllProfile } from "../../api/user";
import { isAuthenticate } from "../../api/auth.js";
import { Link } from "react-router-dom";

import Navbar from '../Navbar/NavbarShow'

const AllUser = () => {
  let [error, setError] = useState(0);
  let [usersInfo, setUsersInfo] = useState([]);

  //get user info
  const { token } = isAuthenticate();

  //get users data
  useEffect(() => {
    getAllProfile(token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setUsersInfo(data.users);
      }
    });
  }, []);

  //show user card
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
                    {user.followers
                      ? user.followers.length
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
            <h1>Total User Found:  <span className="text-danger"> {usersInfo ? usersInfo.length : 0} </span>  </h1>
              {error ? <h5 className="alert alert-danger"> {error} </h5> : "" }  
              {usersInfo && usersInfo.length >0 ? "" : <h5 className="alert alert-warning text-center"> No Other User Found :( </h5>}  
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
