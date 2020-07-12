import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Word from '../word';
import VoiceInput from '../voice-input';
import Progress from '../progress';
import blankPicture from '../assets/blank.jpg';
import './styles.scss';
import { prepareWords, passDictionaryWordsToUserWords } from '../../../../common/helper/WordsHelper';
import { MENU_PAGE, STATISTICS_PAGE } from '../constants';
import setUserStatistics from '../../../long-term-statistics/statisticsService/statisticsService';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preparedWords: [],
      picUrl: blankPicture,
      voiceRecognitionEnabled: false,
      recognizedWord: '',
      stars: 0,
    };
  }

  startGame = () => {
    if (this.state.preparedWords.length !== 0) {
      this.resetWords();
    }

    const { prepareWords } = this.props;
    const { preparedWords, newWordsNumber } = prepareWords(10);
    const words = [...preparedWords];
    this.setState({
      preparedWords: words,
      newWordsNumber,
      picUrl: blankPicture,
      voiceRecognitionEnabled: false,
      recognizedWord: '',
      stars: 0,
    });
  }

  checkRecognizedWord = (recognizedWord) => {
    const { preparedWords, stars } = this.state;

    for (let i = 0; i < preparedWords.length; i += 1) {
      const word = preparedWords[i];

      if (word.word.toLowerCase() === recognizedWord.toLowerCase()) {
        word.answered = true;
        this.setState({ stars: stars + 1 });

        // check if the game finished
        this.checkGameFinished();
      }
    }
  }

  checkGameFinished = () => {
    const { preparedWords, newWordsNumber } = this.state;

    let gameFinished = true;
    preparedWords.forEach((word) => {
      if (!word.answered) {
        gameFinished = false;
      }
    });

    if (gameFinished) {
      const { setUserStatistics, setCurrentPage, passDictionaryWordsToUserWords } = this.props;
      setUserStatistics(preparedWords.length, newWordsNumber);
      this.resetWords();
      this.updateWordsShowDate();
      passDictionaryWordsToUserWords(preparedWords);

      const statsData = [
        { label: 'Общее количество изученных слов', value: preparedWords.length },
        { label: 'Количество новых слов', value: newWordsNumber },
        { label: 'Количество повторенных слов', value: preparedWords.length - newWordsNumber },
      ];
      // navigate to Statistics page
      setCurrentPage(STATISTICS_PAGE, statsData);
    }
  }

  updateWordsShowDate = () => {
    const { preparedWords } = this.state;
    for (let i = 0; i < preparedWords.length; i += 1) {
      const word = preparedWords[i];
      if (word.userWord) {
        const showDate = new Date();
        // show the word in 3 days
        showDate.setDate(showDate.getDate() + 3);
        word.userWord.optional.showDate = showDate.getTime();
      }
    }
  }

  resetWords = () => {
    const { preparedWords } = this.state;
    for (let i = 0; i < preparedWords.length; i += 1) {
      const word = preparedWords[i];
      if (word.answered) {
        delete word.answered;
      }
    }
  }

  speakPleaseClick = () => {
    const newVal = !this.state.voiceRecognitionEnabled;
    this.setState({ voiceRecognitionEnabled: newVal });
  }

  handleWordClick = (wordTranslate, picUrl, callback) => {
    const { voiceRecognitionEnabled } = this.state;

    if (!voiceRecognitionEnabled) {
      this.setState({ picUrl, wordTranslate });
      callback();
    }
  }

  backToMenu = () => {
    const { setCurrentPage } = this.props;
    setCurrentPage(MENU_PAGE);
  }

  componentDidMount() {
    this.startGame();
    // if voice recognition is on then try to check the word with the response of voice recongnition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.maxAlternatives = 1;
    this.recognition.lang = 'en-US';
    this.recognition.addEventListener('result', (event) => {
      const recognizedWord = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      const { voiceRecognitionEnabled } = this.state;
      if (voiceRecognitionEnabled) {
        this.setState({ recognizedWord });
        this.checkRecognizedWord(recognizedWord);
      }
    });
    this.recognition.addEventListener('end', () => {
      if (this.recognition) {
        this.recognition.start();
      }
    });
    this.recognition.start();
  }

  componentWillUnmount() {
    this.recognition.stop();
    this.recognition = null;
  }

  render() {
    const {
      preparedWords, picUrl, wordTranslate, voiceRecognitionEnabled, recognizedWord, stars,
    } = this.state;

    const wordsTemplate = preparedWords.map((word) => (
      <Word
        key={`${word.id}  ${Date.now()}`}
        word={word}
        handleClick={this.handleWordClick}></Word>
    ));

    const speakPleaseClickedStyle = voiceRecognitionEnabled ? { backgroundColor: 'red' } : null;

    return (<div className="speakit-container">
      <div className="speakit">
        <Progress stars={stars}></Progress>
        <div className="picture-container">
          <img className="picture" src={picUrl} alt="SpeakIt game" />
        </div>
        {voiceRecognitionEnabled ? <VoiceInput recognizedWord={recognizedWord}></VoiceInput> : <div className="word-translation">{wordTranslate}</div>}
        <div className="words-wrapper">
          <div className="words">
            {wordsTemplate}
          </div>
        </div>
        <div className="controls">
          <Button onClick={this.startGame}>Restart</Button>
          <Button className="big-button" style={speakPleaseClickedStyle} onClick={this.speakPleaseClick}>Speak please</Button>
          <Button onClick={this.backToMenu} >Menu</Button>
        </div>
      </div>
    </div>);
  }
}

const mapDispatchToProps = {
  prepareWords,
  setUserStatistics,
  passDictionaryWordsToUserWords,
};

export default connect(null, mapDispatchToProps)(Game);
