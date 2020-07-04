import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-bootstrap';
import './styles.scss';

const RightWord = ({
  word,
  imgURL,
  audioURL,
  isSelectAnswer,
}) => {
  const url = 'https://raw.githubusercontent.com/borodichalex/rslang-data/master/';
  const playAudio = (url) => new Audio(url).play();

  if (isSelectAnswer) {
    return (
      <div className="rightWord">
        <Image src={url + imgURL} height="130" roundedCircle />
        <Button className="btn-playAudio" variant="outline-primary" onClick={() => playAudio(url + audioURL)}>
          <Image src="https://image.flaticon.com/icons/svg/727/727269.svg" height="70" roundedCircle />
        </Button>
        <span>{word}</span>
      </div>
    );
  }
  return (
    <div className="rightWord">
      <Button className="btn-playAudio" variant="outline-primary" onClick={() => playAudio(url + audioURL)}>
        <Image src="https://image.flaticon.com/icons/svg/727/727269.svg" height="70" roundedCircle />
      </Button>
    </div>);
};

RightWord.propTypes = {
  imgURL: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired,
};

export default RightWord;
