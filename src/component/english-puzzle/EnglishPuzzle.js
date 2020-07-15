import React from 'react';
import { connect } from 'react-redux';
import GamePage from './GamePage/GamePage';
import StartPage from './StartPage/StartPage';

const EnglishPuzzle = ({ gameWasStarted, dictionaryWords }) => (

  gameWasStarted ? <GamePage/> : <StartPage dictionaryWords={dictionaryWords}/>

);
const mapStateToProps = (state) => ({
  gameWasStarted: state.puzzleGame.gameWasStarted,
  dictionaryWords: state.dictionaryWords.words,
});

export default connect(mapStateToProps)(EnglishPuzzle);
