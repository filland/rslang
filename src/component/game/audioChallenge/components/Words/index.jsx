import React, { useState, useEffect } from 'react';
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

  const templateWords = words.map(({ wordTranslate, id }, index) => (
    <Word
      number={index + 1}
      key={id}
      isRightAnswer={rightWord.id === id}
      wordTranslate={wordTranslate}
      isSelectWord={wordTranslate === selectWord.innerText}
      isSelectAnswer={isSelectAnswer}
    />
  ));

  const handleSelectAnswer = (e) => {
    if (!isSelectAnswer) {
      const selectWord = e.target;
      setAnswerSelected(true);
      setSelectWord(selectWord);
    }
  };

  const handleKeyWord = ({ code }) => {
    const words = [...document.querySelectorAll('.audioChallenge__btn-group button')];
    const variantWords = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5'];
    const indexSelectWord = variantWords.findIndex((key) => key === code);
    if (indexSelectWord + 1 && !isSelectAnswer) {
      setAnswerSelected(true);
      setSelectWord(words[indexSelectWord]);
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyWord);
    return () => {
      window.removeEventListener('keydown', handleKeyWord);
    };
  });

  return (
    <ButtonGroup aria-label="List words" className="audioChallenge__btn-group" onClick={handleSelectAnswer}>{templateWords}</ButtonGroup>
  );
};

export default Words;
