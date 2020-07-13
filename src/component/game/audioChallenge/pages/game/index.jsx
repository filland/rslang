import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Words from '../../components/Words';
// import Loader from '../../../../common/loader';
import { prepareWords, passDictionaryWordsToUserWords } from '../../../../../common/helper/WordsHelper';
import { MENU_PAGE, STATISTICS_PAGE } from '../../constants';
import setUserStatistics from '../../../../long-term-statistics/statisticsService/statisticsService';
import './styles.scss';

const randomWord = (words) => words[Math.round(Math.random() * words.length)];

function Game({ setCurrentPage, prepareWords }) {
  const numTranslatedWord = 5;
  const numberOfStages = 10;

  const [words, setWords] = useState([]);
  useEffect(() => {
    const needWords = numTranslatedWord * numberOfStages;
    const { preparedWords } = prepareWords(needWords);
    const words = preparedWords.slice();
    setWords(words);
  }, [prepareWords]);

  const [stage, setStage] = useState({ stageNum: numberOfStages, words: [], rightWord: null });
  // const [rightWord, setRightWord] = useState(null);
  useEffect(() => {
    if (words.length) {
      const stageWords = [];
      let count = stage.stageNum * numTranslatedWord - 1;
      while (stageWords.length < numTranslatedWord) {
        stageWords.push(words[count]);
        count -= 1;
      }
      const rightWord = randomWord(stageWords);
      setStage((state) => ({ ...state, words: stageWords, rightWord }));
    }
  }, [words, stage.stageNum]);

  const templateWords = words.map(({ id, wordTranslate }) => <Button key={id}>{wordTranslate}</Button>);
  console.log(stage);


  // const url = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  // const playAudio = (url) => {
  //   console.log('audio');
  //   return new Audio(url).play();
  // };
  // useEffect(() => {
  //   playAudio(url);
  // }, []);

  const [count, setCount] = useState(0);

  // if (isSetupGame) {
  return (
    <div className="audioChallenge">
      <Button className="btn-close" variant="outline-danger" onClick={() => setCurrentPage(MENU_PAGE)}>Close</Button>
      <Button className="btn-close" onClick={() => setStage((state) => ({ ...state, stageNum: state.stageNum - 1 }))}>{count}</Button>
      {/* <Words words={stage.stageWords} rightWord={stage.rightWord} /> */}
      <p>{templateWords}</p>
      <p>{JSON.stringify(stage.stageNum)}</p>
    </div>
  );
  // }
  // return <Loader />;
}

const mapDispatchToProps = {
  prepareWords,
  setUserStatistics,
  passDictionaryWordsToUserWords,
};

export default connect(null, mapDispatchToProps)(Game);
