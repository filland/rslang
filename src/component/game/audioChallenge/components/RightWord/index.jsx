import React from "react";
import PropTypes from "prop-types";
import { Button, Image } from "react-bootstrap";
import "./styles.css";

export const RightWord = (props) => {
  const { word, imgURL } = props;

  return (
    <div className="rightWord">
      <Image src={imgURL} height="130" roundedCircle />
      <Button className="btn-playAudio" variant="outline-primary">
        <Image src="https://image.flaticon.com/icons/svg/727/727269.svg" height="70" roundedCircle />
      </Button>
      <span>{word}</span>
    </div>
  );
};

RightWord.propTypes = {
  imgURL: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired,
};
