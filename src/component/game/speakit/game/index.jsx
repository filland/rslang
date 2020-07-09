import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Word from '../word';
import VoiceInput from '../voice-input';
import Progress from '../progress';
import blankPicture from '../assets/blank.jpg';
import './styles.scss';
import { prepareWords } from '../../../../common/helper/WordsHelper';

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
    const { prepareWords } = this.props;
    const { preparedWords, newWordsNumber } = prepareWords(10);
    this.setState({
      preparedWords,
      picUrl: blankPicture,
      voiceRecognitionEnabled: false,
      recognizedWord: '',
      stars: 0,
    });
  }

  componentWillUnmount() {
    this.recognition.stop();
  }

  componentDidMount() {
    this.startGame();
    // if voice recognition is on then try to check the word with the responce of voice recongnition
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
      this.recognition.start();
    });
    this.recognition.start();
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
    const { preparedWords } = this.state;

    let gameFinished = true;
    preparedWords.forEach((word) => {
      if (!word.answered) {
        gameFinished = false;
      }
    });

    if (gameFinished) {
      // navigate to Statistics page
      console.log("SpeakIt game is finished");
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

  // do I really need this method and the button Finish ?
  finishGame = () => {
    // prepare statistics

    // count failed attempts for each word

    // navigate to statistics page

    // add statistics to the app's statistics
  }

  render() {
    const {
      preparedWords, picUrl, wordTranslate, voiceRecognitionEnabled, recognizedWord, stars,
    } = this.state;

    const wordsTemplate = preparedWords.map((word) => (
      <Word
        key={word.id}
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
        <div className="words">
          {wordsTemplate}
        </div>
        <div className="controls">
          <Button onClick={this.startGame}>Restart</Button>
          <Button className="big-button" style={speakPleaseClickedStyle} onClick={this.speakPleaseClick}>Speak please</Button>
          <Button onClick={this.finishGame} disabled>Finish</Button>
        </div>
      </div>
    </div>);
  }
}

const mapStateToProps = (store) => ({
});

const mapDispatchToProps = {
  prepareWords,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
