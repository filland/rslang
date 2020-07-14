import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {
  isLoading, isError,
} from './selectors';
import { isAuthorized } from '../../common/utils/TokenUtils';
import loginUser from './service';

import './styles.scss';

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

    const { loginUser, history } = this.props;
    loginUser(email, password, () => {
      if (isAuthorized()) {
        history.push('/main-page');
      }
    });
  }

  render() {
    const { isError } = this.props;
    return (
      <div className="login-container">
        <Form className='login-form' onSubmit={this.handleUserLogin}>
          <h3>Login</h3>
          <p>or <Link to="/registration">create a new account</Link></p>
          <Form.Group>
            <Form.Control type="email" ref={this.emailInput} placeholder="Email" />
          </Form.Group>
          <Form.Group>
            <Form.Control type="password" ref={this.passwordInput} placeholder="Password" />
          </Form.Group>
          {isError && (<div><Form.Label className="error-label">Email or password is wrong</Form.Label></div>)}
          <Button variant="primary" type="submit" style={{ width: '100%' }}>
            Login
        </Button>
        </Form>
      </div>
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

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Login);
