import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './styles.scss';

export default function NavBar() {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand as={Link} to="/">Logo</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/weather">Weather</Nav.Link>
        <Nav.Link as={Link} to="/login">Login</Nav.Link>
        <Nav.Link as={Link} to="/registration">Registration</Nav.Link>
        <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
      </Nav>
    </Navbar>
  );
}
