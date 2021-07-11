import React from "react";
import { Link , NavLink} from "react-router-dom";
import { Navbar, Nav,  } from "react-bootstrap";
import { signout, isAuthenticate } from "../../api/auth";



import './NavbarShow.css'

const NavbarShow = () => {
  const { user } = isAuthenticate();
  //console.log(user);
  return (
    <div className="navbar_nav">
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/" className="brandName">
          Twitter Clone
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} exact to="/" className="navLink" activeClassName="active-nav">
              Home
            </Nav.Link>

            {!isAuthenticate() && (
              <>
                <Nav.Link as={Link} activeClassName="active-nav" className="navLink" exact to="/signin">
                  Signin
                </Nav.Link>
                <Nav.Link as={Link} activeClassName="active-nav" className="navLink" exact to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}

            {isAuthenticate() && (
              <>
                <Nav.Link as={Link} activeClassName="active-nav" className="navLink" exact  to="/user/profile">
                  {user.username}
                </Nav.Link>
                <Nav.Link as={Link} activeClassName="active-nav" className="navLink" exact to="/tweet">
                  Tweet
                </Nav.Link>
                <Nav.Link as={Link} activeClassName="active-nav" className="navLink" exact to="/user/find">
                  Find User
                </Nav.Link>
                <Nav.Link as={Link}  activeClassName="active-nav" className="navLink" exact  to="/" onClick={() => signout()}>
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
