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
      !isAuthorized()
      && <Navbar variant="light">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/login" className="text-white">Login</Nav.Link>
          <Nav.Link as={Link} to="/registration" className="text-white">Registration</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default withRouter(NavBar);
