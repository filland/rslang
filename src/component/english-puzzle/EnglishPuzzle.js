import React from 'react';
import { connect } from 'react-redux';
import GamePage from './GamePage/GamePage';
import StartPage from './StartPage/StartPage';

const EnglishPuzzle = ({ gameWasStarted }) => (

  gameWasStarted ? <GamePage/> : <StartPage/>

);
const mapStateToProps = (state) => ({
  gameWasStarted: state.puzzleGame.gameWasStarted,
});

export default connect(mapStateToProps)(EnglishPuzzle);
