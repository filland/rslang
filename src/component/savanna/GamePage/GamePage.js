import React from 'react';
import Statistics from './Statistics/Statistics';
import Game from './Game/Game';
import './style.scss';

const GamePage = (props) => (
  props.lifesCount !== 0 && props.numOfCurrentWord < 51
    ? <Game {...props} />
    : <Statistics
      iKnowArr={props.iKnowArr}
      iDontKnowArr={props.iDontKnowArr}
      endGame={props.endGame}
      audioOn={props.audioOn}
      showWordData={props.showWordData}
      wordDataIsShowing={props.wordDataIsShowing}
      dataOfClickedWord={props.dataOfClickedWord}
      setUserStatistics={props.setUserStatistics}
      passDictionaryWordsToUserWords={props.passDictionaryWordsToUserWords}
    />
);

export default GamePage;
