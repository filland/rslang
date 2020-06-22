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

import fetchSprintService from './service';
import Loader from '../common/loader';
import {
  getWordSelector,
  getTranslationSelector,
  getrandomIndexSelector,
  getrandomIndex2Selector,
  getLosingFlagSelector,
} from './selectors';
import parrot from './parrot.png';

const propTypes = {
  fetchSprint: PropTypes.func.isRequired,
  word: PropTypes.string.isRequired,
  translation: PropTypes.string.isRequired,
  randomIndex: PropTypes.number.isRequired,
  randomIndex2: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

let points = 0;
let correctAnswers = 0;
let addPoints = 10;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: { word: null },
    };
    this.handlePressKey.bind(this);
  }

  componentDidMount() {
    const { fetchSprint } = this.props;
    fetchSprint();
  }

  handleClickCorrect = (a, b) => {
    if (a === b) {
      points += addPoints;
      correctAnswers += 1;
      if (correctAnswers === 4) {
        addPoints *= 2;
        correctAnswers = 0;
      }
    } else {
      correctAnswers = 0;
      addPoints = 10;
    }
    const { fetchSprint } = this.props;
    fetchSprint();
  };

  handleClickWrong = (a, b) => {
    if (a !== b) {
      points += addPoints;
      correctAnswers += 1;
      if (correctAnswers === 4) {
        addPoints *= 2;
        correctAnswers = 0;
      }
    } else {
      correctAnswers = 0;
      addPoints = 10;
    }
    const { fetchSprint } = this.props;
    fetchSprint();
  };

  handlePressKey = (event, a, b) => {
    if (event.keyCode === 37) {
      this.handleClickCorrect(a, b);
    }
    if (event.keyCode === 39) {
      this.handleClickWrong(a, b);
    }
  }

  render() {
    const {
      word, translation, randomIndex, randomIndex2, isLoading,
    } = this.props;
    if (isLoading) {
      return (<Loader />);
    }
    document.addEventListener('keydown', (event) => this.handlePressKey(event, randomIndex, randomIndex2), false);
    return (
      <Container fluid>
       <Row className="d-flex flex-column align-items-center">
          <Col className="points my-5 text-center">{points} очков</Col>
          <Row className="time justify-content-center">
            <Col className="align-self-center text-center time-span">3</Col>
          </Row>
          <Card className="d-flex flex-column align-items-center p-5">
            <Card.Img variant="top" src={parrot} alt="Parrot" />
            <Card.Body className="d-flex flex-column align-items-center p-4">
              <Card.Title className="mb-4">{word}</Card.Title>
              <Card.Subtitle className="mb-5 text-muted">{translation}</Card.Subtitle>
              <Row>
                <Button onClick={() => this.handleClickCorrect(randomIndex, randomIndex2)} variant="primary" className="mr-2">
                Правильно!</Button>
                <Button onClick={() => this.handleClickWrong(randomIndex, randomIndex2)} variant="danger">
               Неверно</Button>
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
  translation: getTranslationSelector(store),
  randomIndex: getrandomIndexSelector(store),
  randomIndex2: getrandomIndex2Selector(store),
  isLoading: getLosingFlagSelector(store),
});

const mapDispatchToProps = {
  fetchSprint: fetchSprintService,
};

Game.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
