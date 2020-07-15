import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';
import Words from '../../components/Words';
import RightWord from '../../components/RightWord';
import Loader from '../../../../common/loader';
import { prepareWords, passDictionaryWordsToUserWords } from '../../../../../common/helper/WordsHelper';
import { MENU_PAGE, STATISTICS_PAGE } from '../../constants';
import setUserStatistics from '../../../../long-term-statistics/statisticsService/statisticsService';
import './styles.scss';

const randomWord = (words) => words[Math.floor(Math.random() * words.length)];

function Game({ setCurrentPage, prepareWords }) {
  const numTranslatedWord = 5;
  const numberOfStages = 10;

  const [wordsGame, setWordsGame] = useState([]);
  useEffect(() => {
    const needWords = numTranslatedWord * numberOfStages;
    const { preparedWords } = prepareWords(needWords);
    const words = preparedWords.slice();
    setWordsGame(words);
    console.log(words);
  }, [prepareWords]);

  const [isSelectAnswer, setIsSelectAnswer] = useState(false);
  const setAnswerSelected = () => {
    setIsSelectAnswer(true);
  };

  const [gameProgress, setGameProgress] = useState(0);
  useEffect(() => {
    if (isSelectAnswer) setGameProgress(gameProgress + 1);
  }, [isSelectAnswer]);

  const [stage, setStage] = useState({ stageNum: numberOfStages, words: [], rightWord: null });
  useEffect(() => {
    if (wordsGame.length && stage.stageNum) {
      const stageWords = [];
      let count = stage.stageNum * numTranslatedWord - 1;
      while (stageWords.length < numTranslatedWord) {
        stageWords.push(wordsGame[count]);
        count -= 1;
      }
      const rightWord = randomWord(stageWords);
      setStage((state) => ({ ...state, words: stageWords, rightWord }));
    }
    if (!stage.stageNum) {
      // dispatchWordsStatistics(knowArray, mistakesArray);
      // setUserStatistics(playAllWords.length, newWords);
      setCurrentPage(STATISTICS_PAGE);
    }
  }, [wordsGame, stage.stageNum]);
  const nextStage = () => {
    setIsSelectAnswer(false);
    setStage((state) => ({ ...state, stageNum: state.stageNum - 1 }));
  };

  const handleIsSelectAnswer = () => {
    if (!isSelectAnswer) {
      setIsSelectAnswer(true);
    } else {
      nextStage();
    }
  };

  const handleKeyEnter = (event) => {
    if (event.code === 'Enter') {
      handleIsSelectAnswer();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyEnter);
    return () => {
      window.removeEventListener('keydown', handleKeyEnter);
    };
  });

  if (stage.rightWord) {
    return (
      <div className="audioChallenge__game">
        <ProgressBar className="progressBar" variant="info" now={gameProgress * 10} label={`${gameProgress * 10}%`} srOnly />
        <RightWord word={stage.rightWord} isSelectAnswer={isSelectAnswer} />
        <button className="btn-close" onClick={() => setCurrentPage(MENU_PAGE)}>Close</button>
        <Words words={stage.words} rightWord={stage.rightWord} setAnswerSelected={setAnswerSelected} isSelectAnswer={isSelectAnswer} />
        <button className="btn" onClick={handleIsSelectAnswer}>{(isSelectAnswer) ? 'Next' : 'Не знаю'}</button>
      </div>
    );
  }
  return <Loader />;
}

const mapDispatchToProps = {
  prepareWords,
  setUserStatistics,
  passDictionaryWordsToUserWords,
};

export default connect(null, mapDispatchToProps)(Game);
