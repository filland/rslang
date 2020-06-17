import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { loginUser } from "./service";

import "./styles.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
    };
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
  }

    handleUserLogin = async (e) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        const email = this.emailInput.current.value;
        const password = this.passwordInput.current.value;

        await loginUser(email, password);
        this.setState({
          isError: false,
        });
      } catch (error) {
        this.setState({
          isError: true,
        });
      }
    }

    render() {
      const { isError } = this.state;

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

export default Login;
