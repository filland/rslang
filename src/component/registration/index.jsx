import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {
  isLoading, isError, isDone,
} from './selectors';
import registerUser from './service';

import './styles.scss';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isDone: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

class Registration extends Component {
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

    const { registerUser } = this.props;
    registerUser(email, password);
  }

  render() {
    const { isError, isDone } = this.props;

    return (
      <Form onSubmit={this.handleUserLogin}>
        <h3>Registration page</h3>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" ref={this.emailInput} placeholder="Enter email" required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={this.passwordInput} placeholder="Password" required />
        </Form.Group>
        {isError && (<div><Form.Label className="error-label">Email or password is invalid</Form.Label></div>)}
        {isDone && (<div><Form.Label className="success-label">You were successfully registered!</Form.Label></div>)}
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (store) => ({
  isLoading: isLoading(store),
  isError: isError(store),
  isDone: isDone(store),
});

const mapDispatchToProps = {
  registerUser,
};

Registration.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
