<<<<<<< HEAD
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
        <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
        <Nav.Link as={Link} to="/dictionary">Dictionary</Nav.Link>
        <Nav.Link as={Link} to="/english-puzzle">english-puzzle</Nav.Link>
        <Nav.Link as={Link} to="/sprint">Sprint</Nav.Link>
      </Nav>
    </Navbar>
  );
}
=======
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { isAuthorized, deleteJwtToken } from '../../common/utils/TokenUtils';
import { deleteUserId } from '../../common/utils/UserUtils';
import './styles.scss';

class NavBar extends Component {
  logoutUser = () => {
    deleteJwtToken();
    deleteUserId();
    const { history } = this.props;
    history.push('/login');
  };

  render() {
    return (
      <Navbar bg="light" variant="light" >
        <Navbar.Brand as={Link} to="/">Logo</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          {isAuthorized() ? (
            <>
              <Nav.Link as={Link} to="/weather">Weather</Nav.Link>
              <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
              <Nav.Link as={Link} to="/dictionary">Dictionary</Nav.Link>
              <Nav.Link as={Link} to="/english-puzzle">english-puzzle</Nav.Link>
              <Nav.Link as={Link} to="/game/speakit">SpeakIt</Nav.Link>
              <Nav.Link as={Link} to="/audioChallenge">AudioChallenge</Nav.Link>
              <Nav.Link onClick={this.logoutUser} to="/logout" >Logout</Nav.Link>
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
>>>>>>> 5100c85c28288b1aa92930c47a51fceaf0fe513f
