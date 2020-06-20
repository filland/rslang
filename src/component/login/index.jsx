import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {
  isLoading, isError,
} from './selectors';
import loginUser from './service';

import './styles.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
  }

  handleUserLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const email = this.emailInput.current.value;
    const password = this.passwordInput.current.value;

    const { loginUser } = this.props;
    loginUser(email, password);
  }

  render() {
    const { isError } = this.props;

    return (
      <Form onSubmit={this.handleUserLogin}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" ref={this.emailInput} placeholder="Enter email" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={this.passwordInput} placeholder="Password" />
        </Form.Group>
        {isError && (<div><Form.Label className="error-label">Email or password is wrong</Form.Label></div>)}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (store) => ({
  isLoading: isLoading(store),
  isError: isError(store),
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
