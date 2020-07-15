import React, { useEffect } from 'react';
import { Image } from 'react-bootstrap';
import './styles.scss';

const RightWord = ({
  word,
  isSelectAnswer,
}) => {
  const dataUrl = 'https://raw.githubusercontent.com/borodichalex/rslang-data/master/';
  const playAudio = (url) => new Audio(url).play();

  useEffect(() => {
    playAudio(dataUrl + word.audio);
  }, [word]);

  return (
    <div className={(isSelectAnswer) ? 'rightWord--selectedAnswer' : 'rightWord'}>
      {(isSelectAnswer) && (<Image alt="rightWord" className="rightWord__img" src={dataUrl + word.image} />)}
      <button className="btn rightWord__btn-playAudio" onClick={() => playAudio(dataUrl + word.audio)} />
      {(isSelectAnswer) && (<span className="rightWord__text">{word.word}</span>)}
    </div>
  );
};

export default RightWord;
