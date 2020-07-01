import React from 'react';
import Statistics from './Statistics/Statistics';
import Game from './Game/Game';
import './style.scss';

const GamePage = (props) => (
  props.lifesCount !== 0
    ? <Game {...props} />
    : <Statistics
      iKnowArr={props.iKnowArr}
      iDontKnowArr={props.iDontKnowArr}
      endGame={props.endGame}
      audioOn={props.audioOn}
    />
);

export default GamePage;
