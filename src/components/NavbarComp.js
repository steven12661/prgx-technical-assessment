import React, { Component } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class NavbarComp extends Component {
    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to={"/"}>Home</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                            <Nav.Link as={Link} to={"/todo"}>To-Do</Nav.Link>

                                <Nav.Link as={Link} to={"/profile"}>Profile</Nav.Link>
                                <Nav.Link as={Link} to={"/signup"}>Signup</Nav.Link>
                                <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>

                                <NavDropdown title="Account Settings" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to={"/profilesettings"}>Profile Settings</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Log Out</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}
