import React from 'react';
import { connect } from 'react-redux';
import {
  changeWord, checkAnswer, startGame, endGame, changeVolume, showWordData,
} from './redux/actions';
import Loader from '../common/loader/index';
import GamePage from './GamePage/GamePage';
import StartPage from './StartPage/StartPage';
import gamePageImg from './assets/backgroundGame.jpg';
import correctAudio from './assets/correct.mp3';
import errorAudio from './assets/error.mp3';
import './style.scss';

class Savanna extends React.Component {
  componentDidMount() {
    const { changeWord, numOfCurrentWord, data } = this.props;
    changeWord(1, 1, numOfCurrentWord, data);
  }

  errorAudioRef = React.createRef();

  correctAudioRef = React.createRef();

  render() {
    const { data, startGame, gameWasStarted } = this.props;
    return (
      <>
        <audio src={correctAudio} ref={this.correctAudioRef}></audio>
        <audio src={errorAudio} ref={this.errorAudioRef}></audio>
        {gameWasStarted
          ? (
            <div className='savannaGame'
            style={{ backgroundImage: `url(${gamePageImg})` }}>
              {data.length === 0
                ? <Loader />
                : <GamePage
                  {...this.props}
                  errorAudioRef={this.errorAudioRef}
                  correctAudioRef={this.correctAudioRef}
                  />}
            </div>
          ) : (
            <StartPage startGame={startGame} />
          )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.savannaGame,
});

const mapDispathToProps = {
  changeWord, checkAnswer, startGame, endGame, changeVolume, showWordData,
};

export default connect(mapStateToProps, mapDispathToProps)(Savanna);
