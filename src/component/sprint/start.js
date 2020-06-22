import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './sprint.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'block',
    };
  }

  handleClick() {
    this.setState({ display: 'none' });
  }

  render() {
    const style = { display: this.state.display };
    return (
      <Container id="outer" style={style}>
        <Card className="d-flex flex-column align-items-center p-5 inner" id="inner">
          <Card.Body className="d-flex flex-column align-items-center p-4">
            <Card.Title className="mb-4">Начать Игру?</Card.Title>
            <Row>
              <Link className="btn btn-primary mr-2" to="/game" onClick={() => this.handleClick()}>
                Да!
              </Link>
              <Link className="btn btn-danger" to="/statistics" onClick={() => this.handleClick()}>
                Нет :(
              </Link>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default Start;
