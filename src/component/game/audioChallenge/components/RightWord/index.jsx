import React, { useEffect } from 'react';
import { Button, Image } from 'react-bootstrap';
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
    <div className="rightWord">
      {(isSelectAnswer) && (<Image src={dataUrl + word.image} height="130" roundedCircle />)}
      <Button className="btn-playAudio" variant="outline-primary" onClick={() => playAudio(dataUrl + word.audio)}>
        <Image src="https://image.flaticon.com/icons/svg/727/727269.svg" height="70" roundedCircle />
      </Button>
      {(isSelectAnswer) && (<span>{word.word}</span>)}
    </div>
  );
};

export default RightWord;
