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

const randomNum = (lim) => Math.floor(Math.random() * lim);

function Game({ setCurrentPage, prepareWords, passDictionaryWordsToUserWords }) {
  const numTranslatedWord = 5;
  const numberOfStages = 10;
  const [newWordsNumber, setNewWordsNumber] = useState(0);

  const [wordsGame, setWordsGame] = useState([]);
  useEffect(() => {
    const { preparedWords, newWordsNumber } = prepareWords(numberOfStages);
    const words = preparedWords;
    setWordsGame(words);
    setNewWordsNumber(newWordsNumber);
  }, [prepareWords]);

  const [isSelectAnswer, setIsSelectAnswer] = useState(false);
  const setAnswerSelected = () => {
    setIsSelectAnswer(true);
  };

  const [gameProgress, setGameProgress] = useState(0);
  useEffect(() => {
    if (isSelectAnswer) setGameProgress(gameProgress + 1);
  }, [isSelectAnswer]);

  const updateWordsShowDate = () => {
    for (let i = 0; i < wordsGame.length; i += 1) {
      const word = wordsGame[i];
      if (!word.userWord) {
        word.userWord = {
          difficulty: 'normal',
          optional: {
            counter: 1,
            group: word.group,
            createdDate: Date.now(),
            updatedDate: Date.now(),
            showDate: Date.now(),
            deleted: false,
          },
        };
      }
      const showDate = new Date();
      // show the word in 3 days
      showDate.setDate(showDate.getDate() + 3);
      word.userWord.optional.showDate = showDate.getTime();
    }
  };

  const [stage, setStage] = useState({ stageNum: numberOfStages, words: [], rightWord: null });
  useEffect(() => {
    if (wordsGame.length && stage.stageNum) {
      const { preparedWords } = prepareWords(numTranslatedWord);
      const words = preparedWords;
      const rightWord = wordsGame[stage.stageNum - 1];
      const arr = Array(numTranslatedWord).fill(0);
      const randomIndex = randomNum(numTranslatedWord - 1);
      const stageWords = arr.map((el, index) => {
        if (index === randomIndex) {
          return rightWord;
        }
        return words[index];
      });
      setStage((state) => ({ ...state, words: stageWords, rightWord }));
    }
    if (!stage.stageNum) {
      setUserStatistics(wordsGame.length, newWordsNumber);
      updateWordsShowDate();
      passDictionaryWordsToUserWords(wordsGame);
      // setCurrentPage(STATISTICS_PAGE);
    }
  }, [wordsGame, stage.stageNum, prepareWords]);
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
