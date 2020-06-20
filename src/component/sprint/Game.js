import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './sprint.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import fetchWordsService from './service';
import getWordSelector from './selectors';
import parrot from './parrot.png';

const propTypes = {
  fetchWords: PropTypes.func.isRequired,
  word: PropTypes.objectOf(PropTypes.any).isRequired,
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: { word: null },
    };
  }

  componentDidMount() {
    const { fetchWords } = this.props;

    fetchWords();
  }

  render() {
    const { word } = this.props;
    console.log(word);
    return (
      <Container fluid>
       <Row className="d-flex flex-column align-items-center">
          <Col className="points my-5 text-center">100 очков</Col>
          <Row className="time justify-content-center">
            <Col className="align-self-center text-center time-span">3</Col>
          </Row>
          <Card className="d-flex flex-column align-items-center p-5">
            <Card.Img variant="top" src={parrot} alt="Parrot" />
            <Card.Body className="d-flex flex-column align-items-center p-4">
              <Card.Title className="mb-4">{word}</Card.Title>
              <Card.Subtitle className="mb-5 text-muted">управлять</Card.Subtitle>
              <Row>
                <Button variant="primary" href="https://reactjs.org" className="mr-2">Правильно!</Button>
                <Button variant="danger" href="https://reactjs.org">Неверно</Button>
              </Row>
            </Card.Body>
          </Card>
          <Row className="arrows d-flex flex-row justify-content-around w-25">
            <Col className="arrow left text-center">&#5130;</Col>
            <Col className="arrow right text-center">&#5125;</Col>
          </Row>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (store) => ({
  word: getWordSelector(store),
});

const mapDispatchToProps = {
  fetchWords: fetchWordsService,
};

Game.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
