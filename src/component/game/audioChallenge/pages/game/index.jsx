import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ButtonGroup, Button, ProgressBar } from 'react-bootstrap';
import RightWord from '../../components/RightWord';
import Loader from '../../../../common/loader';
import { MENU_PAGE } from '../../constants';
import './styles.css';
import getUserWords from '../../../../common/word/user-word/selectors';
import getDictionaryWords from '../../../../common/word/dictionary-word/selectors';

const nowProgress = 20;

function Game({ setCurrentPage, dictionaryWords, difficulty }) {
  const [isSetupGame, setIsSetupGame] = useState(false);
  const [rightWord, setRightWord] = useState({ word: null });
  const [words, setWords] = useState([]);

  const randomWord = (words) => words[Math.round(Math.random() * words.length)];

  const getRightWord = (difficulty = 1, words) => {
    const word = randomWord(words);
    console.log('RightWord:', word);
    return word;
  };

  const setStageWords = (words) => {
    const arrayWords = [];
    while (arrayWords.length <= 4) {
      arrayWords.push(randomWord(words));
    }
    return arrayWords.map(({ wordTranslate, id }) => <Button key={id}>{wordTranslate}</Button>);
  };

  useEffect(() => {
    if (dictionaryWords.length) {
      setRightWord(getRightWord(1, dictionaryWords));
    }
  }, [dictionaryWords]);

  useEffect(() => {
    if (dictionaryWords.length && !rightWord.word) {
      setWords(setStageWords(dictionaryWords));
      setIsSetupGame(true);
    }
  }, [dictionaryWords, rightWord]);

  if (isSetupGame) {
    return (
      <div className="audioChallenge">
        <ProgressBar className="progressBar" variant="info" now={nowProgress} label={`${nowProgress}%`} srOnly />
        <RightWord word={rightWord.word} imgURL={rightWord.image} audioURL={rightWord.audio} />
        <Button className="btn-close" variant="outline-danger" onClick={() => setCurrentPage(MENU_PAGE)}>Close</Button>
        <ButtonGroup aria-label="List words">
          {words}
        </ButtonGroup>
        <Button variant="outline-primary">Не знаю</Button>
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
