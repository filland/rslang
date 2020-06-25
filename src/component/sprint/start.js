import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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

  handleClick = () => {
    this.setState({ display: 'none' });
  }

  render() {
    const style = { display: this.state.display };
    return (
      <Container id="outer" style={style}>
        <Card className="d-flex flex-column align-items-center p-5 inner" id="inner">
          <Card.Body className="d-flex flex-column align-items-center p-4">
            <Card.Title className="mb-4">Выберите уровень сложности игры:</Card.Title>
            <Row>
              <Nav.Link as={Link} to="/game" className="btn btn-primary mr-2 mb-2" onClick={() => this.handleClick()}>
                Очень Легкая
              </Nav.Link>
              <Link className="btn btn-danger mr-2 mb-2" to="/game" onClick={() => this.handleClick()}>
                Легкая
              </Link>
              <Link className="btn btn-success mr-2 mb-2" to="/game" onClick={() => this.handleClick()}>
                Интересная
              </Link>
              <Link className="btn btn-warning mr-2 mb-2" to="/game" onClick={() => this.handleClick()}>
                Очень Интересная
              </Link>
              <Link className="btn btn-info mr-2 mb-2" to="/game" onClick={() => this.handleClick()}>
                Сложная
              </Link>
              <Link className="btn btn-secondary mr-2 mb-2" to="/game" onClick={() => this.handleClick()}>
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
