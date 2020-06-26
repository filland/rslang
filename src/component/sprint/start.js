import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './sprint.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

// eslint-disable-next-line import/no-mutable-exports
let level;

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'block',
      level: '',
    };
  }

  handleClick = (levelValue) => {
    this.setState({ display: 'none' });
    level = levelValue;
  }

  render() {
    const style = { display: this.state.display };
    return (
      <Container id="outer" style={style}>
        <Card className="d-flex flex-column align-items-center p-5 inner" id="inner">
          <Card.Body className="d-flex flex-column align-items-center p-4">
            <Card.Title className="mb-4">Выберите уровень сложности игры:</Card.Title>
            <Row className="d-flex flex-column justify-content-center">
              <Link className="btn btn-primary mb-2" to="/game" onClick={() => this.handleClick(0)}>
                Очень Легкая
              </Link>
              <Link className="btn btn-danger mb-2" to="/game" onClick={() => this.handleClick(1)}>
                Легкая
              </Link>
              <Link className="btn btn-success mb-2" to="/game" onClick={() => this.handleClick(2)}>
                Интересная
              </Link>
              <Link className="btn btn-warning mb-2" to="/game" onClick={() => this.handleClick(3)}>
                Очень Интересная
              </Link>
              <Link className="btn btn-info mb-2" to="/game" onClick={() => this.handleClick(4)}>
                Сложная
              </Link>
              <Link className="btn btn-secondary mb-2" to="/game" onClick={() => this.handleClick(5)}>
                Let me speak from my hard advanced
              </Link>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default Start;
export { level };
