import React, { Component } from 'react'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Login';
import Profile from './Profile';
import SignUp from './SignUp';
import Todo from './Todo';

export default class NavbarComp extends Component {
  render() {
    return (
      <Router>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to={"/todo"}>To-Do</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to={"/profile"}>Profile</Nav.Link>
                <Nav.Link as={Link} to={"/signup"}>Sign up</Nav.Link>
                <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>

                <NavDropdown title="Account Settings" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to={"/profile"}>Profile Settings</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/profile"}>Log out</NavDropdown.Item>

                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Switch>
          <Route path="/todo">
            <Todo />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/signup">
            <SignUp />
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
}
