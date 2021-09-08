import React from 'react'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import Login from './Login';
import Profile from './Profile';
import SignUp from './SignUp';
import Todo from './Todo';
import Protected from './Protected';
import ProfileSettings from './ProfileSettings';

function NavbarComp() {
  let user = JSON.parse(sessionStorage.getItem('user'))
  console.log("[From Header]User:", user)
  const history = useHistory();

  function logOut() {
    sessionStorage.clear();
    history.push("/signup");
  }
  
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to={"/todo"}>To-Do</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {
                sessionStorage.getItem('user') ?
                  <>
                    <Nav.Link as={Link} to={"/profile"}>Profile</Nav.Link>

                  </>
                  :
                  <>
                    <Nav.Link as={Link} to={"/signup"}>Sign up</Nav.Link>
                    <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>
                  </>
              }
              {sessionStorage.getItem('user') ?
                <NavDropdown title="Account Settings" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to={"/profilesettings"}>Profile Settings</NavDropdown.Item>

                  <NavDropdown.Item onClick={logOut} >Log out</NavDropdown.Item>

                </NavDropdown>
                : null
              }


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route path="/todo">
          <Protected Cmp={Todo} />
          {/* <Todo /> */}
        </Route>

        <Route path="/profile">
          <Protected Cmp={Profile} />

          {/* <Profile /> */}
        </Route>

        <Route path="/signup">

          <SignUp />
        </Route>
        <Route path="/profilesettings">

          <ProfileSettings />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/">
          <Todo />
        </Route>

      </Switch>

    </Router>
  )

}

export default NavbarComp