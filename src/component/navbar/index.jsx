/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { isAuthorized } from '../../common/utils/TokenUtils';
import './styles.scss';

class NavBar extends Component {
  render() {
    return (
      <Navbar bg="light" variant="light" >
        <Navbar.Brand as={Link} to="/">Logo</Navbar.Brand>
        <Nav className="mr-auto">
          {isAuthorized() ? (
            <>
              <Nav.Link as={Link} to="/learning">Learning words</Nav.Link>
              <Nav.Link as={Link} to="/promo">Promo</Nav.Link>
              <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
              <Nav.Link as={Link} to="/dictionary">Dictionary</Nav.Link>
              <Nav.Link as={Link} to="/statistics">Statistics</Nav.Link>
              <Nav.Link as={Link} to="/long-term-statistics">Long-term statistics</Nav.Link>
            </>
          )
            : (<>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/registration">Registration</Nav.Link>
            </>)
          }
        </Nav>
      </Navbar>
    );
  }
}

export default withRouter(NavBar);
