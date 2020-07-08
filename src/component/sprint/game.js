import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './sprint.scss';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Statistics from './statistics';
import correct from './correct.png';
import wrong from './wrong.png';
import { prepareWords } from '../../common/helper/WordsHelper';
import dispatchWords from './service.js';
import setUserStatistics from '../long-term-statistics/statisticsService/statisticsService';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      englishWord: 'holiday',
      englishWordTranslate: 'праздничный день',
      russianWord: 'праздничный день',
      idEnglishWord: '5e9f5ee35eb9e72bc21af6fd',
      idRussianWord: '5e9f5ee35eb9e72bc21af6fd',
      minutes: 1,
      seconds: 0,
      points: 0,
      correctAnswers: 0,
      addPoints: 10,
      border: '',
      visibilityWrong: '',
      visibilityCorrect: '',
      pointsInfo: '',
      timeEnded: false,
      knowArray: [],
      mistakesArray: [],
      playAllWords: [],
      newWords: 0,
    };
  }

  componentDidMount() {
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

  handleClickCorrect = async () => {
    const {
      englishWord, englishWordTranslate, idEnglishWord, idRussianWord,
      knowArray, mistakesArray, playAllWords, newWords,
    } = this.state;
    const { addPoints, points, correctAnswers } = this.state;
    if (!playAllWords.includes(englishWord)) {
      this.setState((prevState) => ({
        playAllWords: [...prevState.playAllWords, englishWord],
      }));
    }
    if (idEnglishWord === idRussianWord) {
      this.setState({
        border: '5px solid green',
        visibilityWrong: 'hidden',
        visibilityCorrect: 'visible',
        pointsInfo: `+${addPoints} очков за слово`,
        points: points + addPoints,
        correctAnswers: correctAnswers + 1,
      });
      if (!knowArray.includes(`${englishWord} - ${englishWordTranslate}`) && !mistakesArray.includes(`${englishWord} - ${englishWordTranslate}`)) {
        this.setState((prevState) => ({
          knowArray: [...prevState.knowArray, `${englishWord} - ${englishWordTranslate}`],
        }));
      }
      if (correctAnswers === 4) {
        this.setState({
          addPoints: addPoints * 2,
          correctAnswers: 0,
        });
      }
    } else {
      this.setState({
        border: '5px solid red',
        visibilityCorrect: 'hidden',
        visibilityWrong: 'visible',
        pointsInfo: '',
        correctAnswers: 0,
        addPoints: 10,
      });
      if (!knowArray.includes(`${englishWord} - ${englishWordTranslate}`) && !mistakesArray.includes(`${englishWord} - ${englishWordTranslate}`)) {
        this.setState((prevState) => ({
          mistakesArray: [...prevState.mistakesArray, `${englishWord} - ${englishWordTranslate}`],
        }));
      }
    }
    const { prepareWords } = this.props;
    const preparedWordsObject = prepareWords(2);
    const { preparedWords } = preparedWordsObject;
    const { newWordsNumber } = preparedWordsObject;
    this.setState({
      newWords: newWords + newWordsNumber,
    });
    const randomIndex = Math.round(Math.random() * 1);
    const randomIndex2 = Math.round(Math.random() * 1);
    this.setState({
      englishWord: preparedWords[randomIndex].word,
      englishWordTranslate: preparedWords[randomIndex].wordTranslate,
      russianWord: preparedWords[randomIndex2].wordTranslate,
      idEnglishWord: preparedWords[randomIndex].id,
      idRussianWord: preparedWords[randomIndex2].id,
    });
  };

  handleClickWrong = () => {
    const {
      englishWord, englishWordTranslate, idEnglishWord, idRussianWord,
      knowArray, mistakesArray, playAllWords, newWords,
    } = this.state;
    const { addPoints, points, correctAnswers } = this.state;
    if (!playAllWords.includes(englishWord)) {
      this.setState((prevState) => ({
        playAllWords: [...prevState.playAllWords, englishWord],
      }));
    }
    if (idEnglishWord !== idRussianWord) {
      this.setState({
        border: '5px solid green',
        visibilityWrong: 'hidden',
        visibilityCorrect: 'visible',
        pointsInfo: `+${addPoints} очков за слово`,
        points: points + addPoints,
        correctAnswers: correctAnswers + 1,
      });
      if (!knowArray.includes(`${englishWord} - ${englishWordTranslate}`) && !mistakesArray.includes(`${englishWord} - ${englishWordTranslate}`)) {
        this.setState((prevState) => ({
          knowArray: [...prevState.knowArray, `${englishWord} - ${englishWordTranslate}`],
        }));
      }
      if (correctAnswers === 4) {
        this.setState({
          addPoints: addPoints * 2,
          correctAnswers: 0,
        });
      }
    } else {
      this.setState({
        border: '5px solid red',
        visibilityCorrect: 'hidden',
        visibilityWrong: 'visible',
        pointsInfo: '',
        correctAnswers: 0,
        addPoints: 10,
      });
      if (!knowArray.includes(`${englishWord} - ${englishWordTranslate}`) && !mistakesArray.includes(`${englishWord} - ${englishWordTranslate}`)) {
        this.setState((prevState) => ({
          mistakesArray: [...prevState.mistakesArray, `${englishWord} - ${englishWordTranslate}`],
        }));
      }
    }
    const { prepareWords } = this.props;
    const preparedWordsObject = prepareWords(2);
    const { preparedWords } = preparedWordsObject;
    const { newWordsNumber } = preparedWordsObject;
    this.setState({
      newWords: newWords + newWordsNumber,
    });
    const randomIndex = Math.round(Math.random() * 1);
    const randomIndex2 = Math.round(Math.random() * 1);
    this.setState({
      englishWord: preparedWords[randomIndex].word,
      englishWordTranslate: preparedWords[randomIndex].wordTranslate,
      russianWord: preparedWords[randomIndex2].wordTranslate,
      idEnglishWord: preparedWords[randomIndex].id,
      idRussianWord: preparedWords[randomIndex2].id,
    });
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
    const { minutes, seconds } = this.state;
    const { points, pointsInfo } = this.state;
    const { englishWord, russianWord } = this.state;
    const { dispatchWordsStatistics } = this.props;
    const { knowArray, mistakesArray } = this.state;
    const { playAllWords, newWords } = this.state;
    const { setUserStatistics } = this.props;

    if (minutes === 0 && seconds === 0) {
      dispatchWordsStatistics(knowArray, mistakesArray);
      setUserStatistics(playAllWords.length, newWords);
      return <Statistics />;
    }
    return (
      <Container fluid>
        <Row className="d-flex flex-column align-items-center">
          <Col className="points my-5 text-center">{points} очков</Col>
          <Row className="time justify-content-center">
            <Col className="align-self-center text-center time-span">
              <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
            </Col>
          </Row>
          <Card style={styleCard} className="d-flex flex-column align-items-center p-3" id="card">
            <Card.Img variant="top" style={styleCorrect} src={correct} alt="Correct sing" id="correct" />
            <Card.Body className="d-flex flex-column align-items-center p-4">
              <Card.Text id="points-info">{pointsInfo}</Card.Text>
              <Card.Title className="mb-4">{englishWord}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">{russianWord}</Card.Subtitle>
              <Card.Img variant="top" className="mb-3" style={styleWrong} src={wrong} alt="Wrong sing" id="wrong" />
              <Row>
                <Button onClick={() => this.handleClickCorrect()} variant="primary" className="mr-2">
                  Правильно!</Button>
                <Button onClick={() => this.handleClickWrong()} variant="danger">
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

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
  dispatchWordsStatistics: dispatchWords,
  prepareWords,
  setUserStatistics,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
