import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, ProgressBar } from 'react-bootstrap';
import RightWord from '../../components/RightWord';
import Words from '../../components/Words';
import Loader from '../../../../common/loader';
import { MENU_PAGE } from '../../constants';
import './styles.scss';
import getUserWords from '../../../../common/word/user-word/selectors';
import getDictionaryWords from '../../../../common/word/dictionary-word/selectors';

const randomWord = (words) => words[Math.round(Math.random() * words.length)];

function Game({ setCurrentPage, dictionaryWords, difficulty }) {
  const [isSetupGame, setIsSetupGame] = useState(false);
  const [rightWord, setRightWord] = useState({ word: null });
  const [words, setWords] = useState([]);
  const [isSelectAnswer, setIsSelectAnswer] = useState(false);
  const [numStages, setNumStages] = useState(0);

  const setSelectAnswer = () => {
    setIsSelectAnswer(true);
  };

  const getRightWord = (difficulty = 1, words) => {
    const word = randomWord(words);
    return word;
  };

  const setStageWords = (words, rightWord) => {
    const arrayWords = [];
    arrayWords.push(rightWord);
    while (arrayWords.length <= 4) {
      arrayWords.push(randomWord(words));
    }
    return arrayWords;
  };

  const nextStage = () => {
    setNumStages(numStages + 1);
    setIsSelectAnswer(false);
    setRightWord(getRightWord(1, dictionaryWords));
    setWords(setStageWords(dictionaryWords, rightWord));
  };

  const handleBtnNext = () => {
    if (isSelectAnswer) {
      nextStage();
    } else {
      setIsSelectAnswer(true);
    }
  };

  useEffect(() => {
    if (dictionaryWords.length) {
      setRightWord(getRightWord(1, dictionaryWords));
    }
  }, [dictionaryWords]);

  useEffect(() => {
    if (dictionaryWords.length && rightWord.word) {
      setWords(setStageWords(dictionaryWords, rightWord));
      setIsSetupGame(true);
    }
  }, [dictionaryWords, rightWord]);

  const progressStyles = {
    background: `linear-gradient(to right, rgba(8, 170, 108, .6) ${numStages * 10}%, rgba(177, 43, 43, .6) 0%)`,
    height: '100%',
  };

  if (isSetupGame) {
    return (
      <div className="audioChallenge" style={progressStyles}>
        <ProgressBar className="progressBar" variant="info" now={numStages * 10} label={`${numStages * 10}%`} srOnly />
        <RightWord word={rightWord.word} imgURL={rightWord.image} audioURL={rightWord.audio} isSelectAnswer={isSelectAnswer} />
        <Button className="btn-close" variant="outline-danger" onClick={() => setCurrentPage(MENU_PAGE)}>Close</Button>
        <Words words={words} rightWord={rightWord} setIsSelectAnswer={setSelectAnswer} isSelectAnswer={isSelectAnswer} />
        <Button variant="outline-primary" onClick={handleBtnNext}>{(isSelectAnswer) ? 'Next' : 'Не знаю'}</Button>
      </div>
    );
  }
  return <Loader />;
}

Game.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  dictionaryWords: getDictionaryWords(store),
  userWords: getUserWords(store),
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
