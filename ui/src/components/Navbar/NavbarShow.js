import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav,  } from "react-bootstrap";
import { signout, isAuthenticate } from "../../api/auth";

//css
import './NavbarShow.css'

const NavbarShow = () => {

  //get user info
  const { user } = isAuthenticate();

  return (
    <div className="navbar_nav">
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/" className="brandName">
          Twitter Clone
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link}  to="/" className="navLink">
              Home
            </Nav.Link>

            {!isAuthenticate() && (
              <>
                <Nav.Link as={Link}  className="navLink"  to="/signin">
                  Signin
                </Nav.Link>
                <Nav.Link as={Link}  className="navLink"  to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}

            {isAuthenticate() && (
              <>
                <Nav.Link as={Link} className="navLink"   to="/user/profile">
                  {user.username}
                </Nav.Link>
                <Nav.Link as={Link}  className="navLink"  to="/tweet">
                  Tweet
                </Nav.Link>
                <Nav.Link as={Link}  className="navLink"  to="/user/find">
                  Find User
                </Nav.Link>
                <Nav.Link as={Link}  className="navLink"   to="/" onClick={() => signout()}>
                  Signout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <hr />
    </div>
  );
};

export default NavbarShow;
