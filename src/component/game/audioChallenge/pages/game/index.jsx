import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, ProgressBar } from 'react-bootstrap';
import RightWord from '../../components/RightWord';
import Words from '../../components/Words';
import Loader from '../../../../common/loader';
import { prepareWords, passDictionaryWordsToUserWords } from '../../../../../common/helper/WordsHelper';
import { MENU_PAGE, STATISTICS_PAGE } from '../../constants';
import setUserStatistics from '../../../../long-term-statistics/statisticsService/statisticsService';
import './styles.scss';

const randomWord = (words) => words[Math.round(Math.random() * words.length)];

function Game({ prepareWords, setCurrentPage }) {
  const numTranslatedWord = 5;
  const [isSetupGame, setIsSetupGame] = useState(false);
  // const [isSelectAnswer, setIsSelectAnswer] = useState(false);
  // const [rightWord, setRightWord] = useState({ word: null });
  // const [stageNumber, setStageNumber] = useState(0);
  const [words, setWords] = useState([]);
  const [newWordsNum, setNewWordsNum] = useState(0);

  const [stage, setStage] = useState({ rightWord: {}, translatedWords: [], isSetup: false });
  // const [isSetupStage, setIsSetupStage] = useState(false);
  const [numStages, setNumStages] = useState(10);

  const getWordsGame = () => {
    const { preparedWords, newWordsNumber } = prepareWords(numStages * numTranslatedWord);
    const words = preparedWords.slice();
    setNewWordsNum(newWordsNumber);
    setWords(words);
    setIsSetupGame(true);
  };
  useEffect(() => {
    if (!words.length) {
      getWordsGame();
    }
  });

  const setupStage = () => {
    const stageWords = [];
    let count = numStages * numTranslatedWord - 1;
    while (stageWords.length < numTranslatedWord) {
      stageWords.push(words[count]);
      count -= 1;
    }
    const rightWord = randomWord(stageWords);
    // const translatedWords = stageWords.map(({ wordTranslate }) => wordTranslate);
    setStage({ rightWord, stageWords, isSetup: true });
    console.log(rightWord, stageWords, numStages);
  };

  const nextStage = () => {
    console.log('next');
    setNumStages(numStages - 1);
    // setStage({ rightWord: {}, translatedWords: [], isSetup: false });
    setupStage();
  };

  useEffect(() => {
    if (words.length && !stage.isSetup) {
      setupStage();
    }
  });

  // useEffect(() => {
  //   if (words.length && stage.isSetup) {
  //     console.log('setupGame');
  //     setIsSetupGame(true);
  //   }
  // });

  // const setSelectAnswer = () => {
  //   setIsSelectAnswer(true);
  // };

  // const getRightWord = (difficulty = 1, words) => {
  //   const word = randomWord(words);
  //   return word;
  // };

  // const setStageWords = (words, rightWord) => {
  //   const arrayWords = [];
  //   arrayWords.push(rightWord);
  //   while (arrayWords.length <= 4) {
  //     arrayWords.push(randomWord(words));
  //   }
  //   return arrayWords;
  // };

  // const nextStage = () => {
  //   setNumStages(numStages + 1);
  //   setIsSelectAnswer(false);
  //   setRightWord(getRightWord(1, dictionaryWords));
  //   setWords(setStageWords(dictionaryWords, rightWord));
  // };

  // const handleBtnNext = () => {
  //   if (isSelectAnswer) {
  //     nextStage();
  //   } else {
  //     setIsSelectAnswer(true);
  //   }
  // };

  const progressStyles = {
    // background: `linear-gradient(to right, rgba(8, 170, 108, .6) ${numStages * 10}%, rgba(177, 43, 43, .6) 0%)`,
    height: '100%',
  };

  if (isSetupGame) {
    return (
      <div className="audioChallenge" style={progressStyles}>
        {/* <ProgressBar className="progressBar" variant="info" now={numStages * 10} label={`${numStages * 10}%`} srOnly /> */}
        {/* <RightWord word={rightWord.word} imgURL={rightWord.image} audioURL={rightWord.audio} isSelectAnswer={isSelectAnswer} /> */}
        <Button className="btn-close" variant="outline-danger" onClick={() => setCurrentPage(MENU_PAGE)}>Close</Button>
        <Button className="btn-close" variant="outline-danger" onClick={() => nextStage()}>nextStage</Button>
        {/* <Words words={stage.stageWords} rightWord={stage.rightWord} /> */}
        {/* <Words words={words} rightWord={rightWord} setIsSelectAnswer={setSelectAnswer} isSelectAnswer={isSelectAnswer} /> */}
        {/* <Button variant="outline-primary" onClick={handleBtnNext}>{(isSelectAnswer) ? 'Next' : 'Не знаю'}</Button> */}
      </div>
    );
  }
  return <Loader />;
}

Game.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  prepareWords,
  setUserStatistics,
  passDictionaryWordsToUserWords,
};

export default connect(null, mapDispatchToProps)(Game);
