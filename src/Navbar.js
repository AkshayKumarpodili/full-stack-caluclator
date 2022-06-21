import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {Route,Routes} from 'react-router-dom';
import Home  from "./components/Home";
import Signup  from "./components/Signup";




function Navbar() {
  return (
    <div className="container">
      <div className='content-wrap'>
       <h1 className='text-center text-info'>Welcome To React <FcCamera/></h1>
      <Navbar  collapseOnSelect expand="sm" bg="dark" variant='dark'>
        <Container>
          <Navbar.Brand href="#home" className='text-primary'>MyApp</Navbar.Brand>
          <Navbar.Toggle  aria-controls='responsive-navbar-nav'/>
          <Navbar.Collapse  id='responsive-navbar-nav'>
          <Nav className='ms-auto'>
            <>
            {/* these links are available when no user logged in  */}
             <NavLink className='nav-link text-info' to="/">Home</NavLink>
             <NavLink className='nav-link  text-info' to="/signup">Signup</NavLink>
             {/* this dropdown is visible only when a user is logged in  */}
              <NavDropdown   title={userObj.username} id="collasible-nav-dropdown">
                {/* navigate('./userdashboard') */}
                 <NavDropdown.Item>Change Password</NavDropdown.Item>
                 <NavDropdown.Divider/>
                 <NavDropdown.Item onClick={userLogout}>Logout</NavDropdown.Item>
                 {/* navigate('./userdashboard') */}
              </NavDropdown>
             </> 
            </Nav> 
          </Navbar.Collapse>  
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>  



        </div>  
      </div>

  )
}

export default Navbar