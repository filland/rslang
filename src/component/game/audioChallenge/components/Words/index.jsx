import React, { useState } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import Word from '../Word';
import './styles.scss';

const Words = ({
  words,
  rightWord,
  setAnswerSelected,
  isSelectAnswer,
}) => {
  const [selectWord, setSelectWord] = useState('');

  const templateWords = words.map(({ wordTranslate, id }) => (
    <Word
      key={id}
      isRightAnswer={rightWord.id === id}
      wordTranslate={wordTranslate}
      isSelectWord={wordTranslate === selectWord.innerText}
      isSelectAnswer={isSelectAnswer}
    />
  ));

  const handleSelectAnswer = (e) => {
    const selectWord = e.target;
    setAnswerSelected(true);
    setSelectWord(selectWord);
  };

  return (
    <ButtonGroup aria-label="List words" onClick={handleSelectAnswer}>{templateWords}</ButtonGroup>
  );
};

export default Words;
