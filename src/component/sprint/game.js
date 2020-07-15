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
import correct from './correct2.png';
import wrong from './wrong.png';
import { prepareWords, passDictionaryWordsToUserWords } from '../../common/helper/WordsHelper';
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
      preparedWords: [],
      newPreparedWords: [],
    };
  }

  componentDidMount() {
    const { newWords } = this.state;
    const { prepareWords } = this.props;
    const preparedWordsObject = prepareWords(100);
    const { preparedWords, newWordsNumber } = preparedWordsObject;
    const words = preparedWords;
    this.setState({
      preparedWords: words,
      newWords: newWords + newWordsNumber,
    });
    const firstWord = preparedWords[Math.round(Math.random() * 99)];
    const secondWord = preparedWords[Math.round(Math.random() * 99)];
    this.setState({
      newPreparedWords: [firstWord, secondWord],
    });

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
    const { playAllWords, newWords } = this.state;
    const { setUserStatistics, passDictionaryWordsToUserWords } = this.props;
    setUserStatistics(playAllWords.length, newWords);
    passDictionaryWordsToUserWords(playAllWords);
    clearInterval(this.myInterval);
  }

  takeTwoWords = () => {
    const { preparedWords } = this.state;
    const firstWord = preparedWords[Math.round(Math.random() * 99)];
    const secondWord = preparedWords[Math.round(Math.random() * 99)];
    this.setState({
      newPreparedWords: [firstWord, secondWord],
    });
  }

  handleClickCorrect = () => {
    const {
      englishWord, englishWordTranslate, idEnglishWord, idRussianWord,
      knowArray, mistakesArray, playAllWords, newPreparedWords,
    } = this.state;
    const { addPoints, points, correctAnswers } = this.state;

    if (idEnglishWord === idRussianWord) {
      this.setState({
        border: '5px solid #5C9EAD',
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
        border: '5px solid #CC2936',
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

    this.takeTwoWords();
    const randomIndex = Math.round(Math.random() * 1);
    const randomIndex2 = Math.round(Math.random() * 1);
    if (!playAllWords.includes(newPreparedWords[randomIndex])) {
      this.setState((prevState) => ({
        playAllWords: [...prevState.playAllWords, newPreparedWords[randomIndex]],
      }));
    }
    this.setState({
      englishWord: newPreparedWords[randomIndex].word,
      englishWordTranslate: newPreparedWords[randomIndex].wordTranslate,
      russianWord: newPreparedWords[randomIndex2].wordTranslate,
      idEnglishWord: newPreparedWords[randomIndex].id,
      idRussianWord: newPreparedWords[randomIndex2].id,
    });
  };

  handleClickWrong = () => {
    const {
      englishWord, englishWordTranslate, idEnglishWord, idRussianWord,
      knowArray, mistakesArray, playAllWords, newPreparedWords,
    } = this.state;
    const { addPoints, points, correctAnswers } = this.state;
    if (idEnglishWord !== idRussianWord) {
      this.setState({
        border: '5px solid #5C9EAD',
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
        border: '5px solid #CC2936',
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

    this.takeTwoWords();
    const randomIndex = Math.round(Math.random() * 1);
    const randomIndex2 = Math.round(Math.random() * 1);
    if (!playAllWords.includes(newPreparedWords[randomIndex])) {
      this.setState((prevState) => ({
        playAllWords: [...prevState.playAllWords, newPreparedWords[randomIndex]],
      }));
    }
    this.setState({
      englishWord: newPreparedWords[randomIndex].word,
      englishWordTranslate: newPreparedWords[randomIndex].wordTranslate,
      russianWord: newPreparedWords[randomIndex2].wordTranslate,
      idEnglishWord: newPreparedWords[randomIndex].id,
      idRussianWord: newPreparedWords[randomIndex2].id,
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
    if (minutes === 0 && seconds === 0) {
      dispatchWordsStatistics(knowArray, mistakesArray);
      return <Statistics />;
    }
    return (
      <Container fluid>
        <Row className="d-flex flex-column align-items-center">
          <Col className="points my-5 text-center">{points} очков</Col>
          <Row className="time justify-content-center mb-5">
            <Col className="align-self-center text-center time-span">
              <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
            </Col>
          </Row>
          <Card style={styleCard} className="d-flex flex-column align-items-center p-3 card">
            <Card.Img variant="top" style={styleCorrect} src={correct} alt="Correct sing" id="correct" />
            <Card.Body className="d-flex flex-column align-items-center p-4">
              <Card.Text id="points-info">{pointsInfo}</Card.Text>
              <Card.Title className="mb-4">{englishWord}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">{russianWord}</Card.Subtitle>
              <Card.Img variant="top" className="mb-3" style={styleWrong} src={wrong} alt="Wrong sing" id="wrong" />
              <Row>
                <Button onClick={() => this.handleClickCorrect()} className="mr-2" id="correct-button">
                  Правильно!</Button>
                <Button onClick={() => this.handleClickWrong()} id="wrong-button">
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
  passDictionaryWordsToUserWords,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
