<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './styles.css';

export default function NavBar() {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand as={Link} to="/">Logo</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/weather">Weather</Nav.Link>
        <Nav.Link as={Link} to="/login">Login</Nav.Link>
      </Nav>
    </Navbar>
  );
}
=======
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./styles.scss";

export default function NavBar() {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand as={Link} to="/">Logo</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/weather">Weather</Nav.Link>
      </Nav>
    </Navbar>
  );
}
>>>>>>> 9d3caa7... refactor: change .css to .scss
