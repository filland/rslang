import React from 'react';
import { connect } from 'react-redux';
import {
  changeWord, checkAnswer, startGame, animation, changeTimer,
  endGame, changeVolume, showWordData, changeTimerCount, timerOff, changeWordAfterTimer,
} from './redux/actions';
import { prepareWords } from '../../common/helper/WordsHelper';
import Loader from '../common/loader/index';
import GamePage from './GamePage/GamePage';
import StartPage from './StartPage/StartPage';
import gamePageImg from './assets/backgroundGame.jpg';
import correctAudio from './assets/correct.mp3';
import errorAudio from './assets/error.mp3';
import './style.scss';

const Savanna = (props) => {
  const {
    data, startGame, gameWasStarted, dictionaryWords, changeWord, numOfCurrentWord, prepareWords,
  } = props;
  const errorAudioRef = React.createRef();
  const correctAudioRef = React.createRef();

  const getWords = () => {
    const words = prepareWords(50).preparedWords;
    changeWord(numOfCurrentWord, words);
  };

  return (
    <>
      <audio src={correctAudio} ref={correctAudioRef}></audio>
      <audio src={errorAudio} ref={errorAudioRef}></audio>
      {gameWasStarted
        ? (
          <div className='savannaGame'
            style={{ backgroundImage: `url(${gamePageImg})` }}>
            {data.length === 0
              ? <Loader />
              : <GamePage
                {...props}
                errorAudioRef={errorAudioRef}
                correctAudioRef={correctAudioRef}
              />}
          </div>
        ) : (
          <StartPage
            startGame={startGame}
            getWords={getWords}
            dictionaryWords={dictionaryWords} />
        )}
    </>
  );
};

const mapStateToProps = (state) => ({
  ...state.savannaGame,
  dictionaryWords: state.dictionaryWords.words,
  userWords: state.userWords.words,
});

const mapDispathToProps = {
  changeWord,
  checkAnswer,
  startGame,
  endGame,
  changeVolume,
  showWordData,
  changeTimerCount,
  timerOff,
  animation,
  changeTimer,
  changeWordAfterTimer,
  prepareWords,
};

export default connect(mapStateToProps, mapDispathToProps)(Savanna);
