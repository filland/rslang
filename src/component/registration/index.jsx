import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {
  isLoading, isError, isLoaded, getError,
} from './selectors';
import registerUser from './service';

import './styles.scss';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  error: PropTypes.string,
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
    const { isError, isLoaded, error } = this.props;

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
        {isError && (<div><Form.Label className="error-label">{error}</Form.Label></div>)}
        {isLoaded && (<div><Form.Label className="success-label">You were successfully registered! Now you can <Link to="/login">log in</Link></Form.Label></div>)}
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
  isLoaded: isLoaded(store),
  error: getError(store),
});

const mapDispatchToProps = {
  registerUser,
};

Registration.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
