import React, { useState } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import Word from '../Word';
import './styles.scss';

const Words = ({
  words,
  rightWord,
  setIsSelectAnswer,
  isSelectAnswer,
}) => {
  const [isRightAnswer, setIsRightAnswer] = useState('');
  const [isSelectWord, setIsSelectWord] = useState({});

  const templateWords = words.map(({ wordTranslate, id }) => (
    <Word
      key={id}
      rightWord={rightWord.id === id}
      wordTranslate={wordTranslate}
      answer={(isSelectAnswer) ? isRightAnswer : ''}
      select={isSelectWord.innerText === wordTranslate} />
  ));

  const handleSelectAnswer = (e) => {
    setIsSelectAnswer(true);
    const selectWord = e.target;
    setIsSelectWord(selectWord);
    const answer = (rightWord.wordTranslate === selectWord.innerText);
    return (answer) ? setIsRightAnswer(true) : setIsRightAnswer(false);
  };

  return (
    <ButtonGroup aria-label="List words" onClick={handleSelectAnswer}>{templateWords}</ButtonGroup>
  );
};

export default Words;
