import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
  getwordTranslateSelector,
  getLosingFlagSelector,
} from './selectors';
import correct from './correct.png';
import wrong from './wrong.png';

const propTypes = {
  fetchSprint: PropTypes.func.isRequired,
  word: PropTypes.string.isRequired,
  translation: PropTypes.string.isRequired,
  randomIndex: PropTypes.number.isRequired,
  randomIndex2: PropTypes.number.isRequired,
  wordTranslate: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

let points = 0;
let correctAnswers = 0;
let addPoints = 10;
export const knowArr = [];
export const mistakesArr = [];

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: { word: null },

      minutes: 1,
      seconds: 0,
    };
  }

  componentDidMount() {
    const { fetchSprint } = this.props;
    fetchSprint();

    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  handleClickCorrect = (a, b) => {
    const { word, wordTranslate } = this.props;
    if (a === b) {
      document.getElementById('card').style.border = 'none';
      document.getElementById('wrong').style.visibility = 'hidden';
      document.getElementById('correct').style.visibility = 'visible';
      document.getElementById('card').style.border = '5px solid green';
      document.getElementById('points-info').innerText = `+${addPoints} очков за слово`;
      points += addPoints;
      correctAnswers += 1;
      if (correctAnswers === 4) {
        addPoints *= 2;
        correctAnswers = 0;
      }
      knowArr.push(`${word} - ${wordTranslate}`);
    } else {
      document.getElementById('card').style.border = 'none';
      document.getElementById('correct').style.visibility = 'hidden';
      document.getElementById('wrong').style.visibility = 'visible';
      document.getElementById('card').style.border = '5px solid red';
      document.getElementById('points-info').innerText = '';
      correctAnswers = 0;
      addPoints = 10;
      mistakesArr.push(`${word} - ${wordTranslate}`);
    }
    const { fetchSprint } = this.props;
    fetchSprint();
  };

  handleClickWrong = (a, b) => {
    const { word, wordTranslate } = this.props;
    if (a !== b) {
      document.getElementById('card').style.border = 'none';
      document.getElementById('wrong').style.visibility = 'hidden';
      document.getElementById('correct').style.visibility = 'visible';
      document.getElementById('card').style.border = '5px solid green';
      document.getElementById('points-info').innerText = `+${addPoints} очков за слово`;
      points += addPoints;
      correctAnswers += 1;
      if (correctAnswers === 4) {
        addPoints *= 2;
        correctAnswers = 0;
      }
      knowArr.push(`${word} - ${wordTranslate}`);
    } else {
      document.getElementById('card').style.border = 'none';
      document.getElementById('correct').style.visibility = 'hidden';
      document.getElementById('wrong').style.visibility = 'visible';
      document.getElementById('card').style.border = '5px solid red';
      document.getElementById('points-info').innerText = '';
      correctAnswers = 0;
      addPoints = 10;
      mistakesArr.push(`${word} - ${wordTranslate}`);
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
    const { minutes, seconds } = this.state;
    const {
      word, translation, randomIndex, randomIndex2, isLoading,
    } = this.props;
    document.addEventListener('keydown', (event) => this.handlePressKey(event, randomIndex, randomIndex2), false);
    return (
      <Container fluid>
       <Row className="d-flex flex-column align-items-center">
          <Col className="points my-5 text-center">{points} очков</Col>
          <Row className="time justify-content-center">
            <Col className="align-self-center text-center time-span">
            { minutes === 0 && seconds === 0
              ? <Redirect to="/statistics"></Redirect>
              : <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                }
              </Col>
          </Row>
          <Card className="d-flex flex-column align-items-center p-3" id="card">
            <Card.Img variant="top" src={correct} alt="Correct sing" id="correct"/>
            <Card.Body className="d-flex flex-column align-items-center p-4">
              <Card.Text id="points-info"></Card.Text>
              <Card.Title className="mb-4">{word}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">{translation}</Card.Subtitle>
              <Card.Img variant="top" className="mb-3" src={wrong} alt="Wrong sing" id="wrong"/>
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
  wordTranslate: getwordTranslateSelector(store),
  randomIndex: getrandomIndexSelector(store),
  randomIndex2: getrandomIndex2Selector(store),
  isLoading: getLosingFlagSelector(store),
});

const mapDispatchToProps = {
  fetchSprint: fetchSprintService,
};

Game.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
