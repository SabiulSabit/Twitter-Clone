import React from 'react'
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { signout, isAuthenticate  } from "../../api/auth";


const NavbarShow = ()=> {
  
   const {user} = isAuthenticate();
   //console.log(user);
    return (
      <div  className="navbar_nav">
      <Navbar expand="lg"  bg="dark" variant="dark" >
        <Navbar.Brand as={Link} to="/" className="brandName">
          Twitter Clone
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/" >
          Home
          </Nav.Link>
         

          {/* {isAuthenticate() && isAuthenticate().user.role === 0 && (
            <Nav.Link
              as={Link}
              to="/user/dashboard"
              style={isActive(history, "/user/dashboard")}
            >
              <FontAwesomeIcon icon={faChartLine} />
              <span className="navItem"> Dashboard</span> 
            </Nav.Link>
          )} */}

          {/* {isAuthenticate() && isAuthenticate().user.role === 1 && (
            <Nav.Link
              as={Link}
              to="/admin/dashboard"
              style={isActive(history, "/admin/dashboard")}
            >
              <FontAwesomeIcon icon={faChartLine} />  <span className="navItem"> Dashboard</span> 
            </Nav.Link>
          )} */}

          {!isAuthenticate() && (
            <>
              <Nav.Link
                as={Link}
                to="/signin"
                
              >
             Signin
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/signup"
               
              >
              Signup
              </Nav.Link>
            </>
          )}

          {isAuthenticate() && (
            <>
             <Nav.Link
              as={Link}
              to="/user/profile" >
               {user.username}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/tweet" >
               Tweet
            </Nav.Link>
              <Nav.Link
                as={Link}
                to="/" onClick={() =>
                  signout()
                  }>
              Signout
              </Nav.Link>
            </>
          )} 
        </Nav>
        </Navbar.Collapse>
      </Navbar>

      <hr />
    </div>
    )
}

export default NavbarShow;

