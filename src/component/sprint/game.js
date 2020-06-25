import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
      word: null,
      wordTranslate: null,
      randomIndex: null,
      randomIndex2: null,
      minutes: 1,
      seconds: 0,
      border: '',
      visibilityWrong: '',
      visibilityCorrect: '',
      pointsInfo: '',
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
    document.addEventListener('keydown', (event) => this.handlePressKey(event), false);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  handleClickCorrect = () => {
    const {
      word, wordTranslate, randomIndex, randomIndex2,
    } = this.props;
    if (randomIndex === randomIndex2) {
      this.setState({ border: '5px solid green' });
      this.setState({ visibilityWrong: 'hidden' });
      this.setState({ visibilityCorrect: 'visible' });
      this.setState({ pointsInfo: `+${addPoints} очков за слово` });
      points += addPoints;
      correctAnswers += 1;
      if (correctAnswers === 4) {
        addPoints *= 2;
        correctAnswers = 0;
      }
      if (!knowArr.includes(`${word} - ${wordTranslate}`) && !mistakesArr.includes(`${word} - ${wordTranslate}`)) {
        knowArr.push(`${word} - ${wordTranslate}`);
      }
    } else {
      this.setState({ border: '5px solid red' });
      this.setState({ visibilityCorrect: 'hidden' });
      this.setState({ visibilityWrong: 'visible' });
      this.setState({ pointsInfo: '' });
      correctAnswers = 0;
      addPoints = 10;
      if (!mistakesArr.includes(`${word} - ${wordTranslate}`) && !knowArr.includes(`${word} - ${wordTranslate}`)) {
        mistakesArr.push(`${word} - ${wordTranslate}`);
      }
    }
    const { fetchSprint } = this.props;
    fetchSprint();
  };

  handleClickWrong = () => {
    const {
      word, wordTranslate, randomIndex, randomIndex2,
    } = this.props;
    if (randomIndex !== randomIndex2) {
      this.setState({ border: '5px solid green' });
      this.setState({ visibilityWrong: 'hidden' });
      this.setState({ visibilityCorrect: 'visible' });
      this.setState({ pointsInfo: `+${addPoints} очков за слово` });
      points += addPoints;
      correctAnswers += 1;
      if (correctAnswers === 4) {
        addPoints *= 2;
        correctAnswers = 0;
      }
      if (!knowArr.includes(`${word} - ${wordTranslate}`) && !mistakesArr.includes(`${word} - ${wordTranslate}`)) {
        knowArr.push(`${word} - ${wordTranslate}`);
      }
    } else {
      this.setState({ border: '5px solid red' });
      this.setState({ visibilityCorrect: 'hidden' });
      this.setState({ visibilityWrong: 'visible' });
      this.setState({ pointsInfo: '' });
      correctAnswers = 0;
      addPoints = 10;
      if (!mistakesArr.includes(`${word} - ${wordTranslate}`) && !knowArr.includes(`${word} - ${wordTranslate}`)) {
        mistakesArr.push(`${word} - ${wordTranslate}`);
      }
    }
    const { fetchSprint } = this.props;
    fetchSprint();
  };

  handlePressKey = (event) => {
    if (event.keyCode === 37) {
      this.handleClickCorrect();
    } else if (event.keyCode === 39) {
      this.handleClickWrong();
    }
  }

  render() {
    const styleCard = { border: this.state.border };
    const styleWrong = { visibility: this.state.visibilityWrong };
    const styleCorrect = { visibility: this.state.visibilityCorrect };
    const { pointsInfo } = this.state;
    const { minutes, seconds } = this.state;
    const {
      word, translation, randomIndex, randomIndex2,
    } = this.props;
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
          <Card style={ styleCard } className="d-flex flex-column align-items-center p-3" id="card">
            <Card.Img variant="top" style={ styleCorrect } src={correct} alt="Correct sing" id="correct"/>
            <Card.Body className="d-flex flex-column align-items-center p-4">
              <Card.Text id="points-info">{ pointsInfo }</Card.Text>
              <Card.Title className="mb-4">{word}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">{translation}</Card.Subtitle>
              <Card.Img variant="top" className="mb-3" style={ styleWrong } src={wrong} alt="Wrong sing" id="wrong"/>
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
