import React from "react";
import playImg from "../../assets/images/play-circle-regular.svg";

import "./Results.scss";

const Results = (props) => {
  const playAudio = (e) => {
    e.target.nextElementSibling.play();
  };
  return (
    <div className="backgroundOfStatistics">
      <div className="statistics">
        <div className="pictureData">
          <div className="picture">
            <img
              src={`https://raw.githubusercontent.com/liplyanin/rslang_data_paintings/master/${props.pictureData.imageSrc}`}
              alt="img"
            />
          </div>
          <span>
            {props.pictureData.author}
            {" "}
            -
            {" "}
            {props.pictureData.name}
            {" "}
            (
            {props.pictureData.year}
            )
          </span>
        </div>
        <div className="iKnow">
          <span>
            <b>I know:</b>
            {" "}
          </span>
          {props.iKnowArr.map((el, i) => (
            <div className="item" key={(el, i)}>
              <img src={playImg} alt="play" onClick={playAudio} />
              <audio
                src={`https://raw.githubusercontent.com/liplyanin/rslang-data/master/${el.audioSrc}`}
                id={el.word}
              />
              {el.str}
            </div>
          ))}
        </div>
        <div className="iDontKnow">
          <span>
            <b>I don't know: </b>
          </span>
          {props.iDontKnowArr.map((el, i) => (
            <div className="item" key={(el, i)}>
              <img src={playImg} alt="play" onClick={playAudio} />
              <audio
                src={`https://raw.githubusercontent.com/liplyanin/rslang-data/master/${el.audioSrc}`}
                id={el.word}
              />
              {el.str}
            </div>
          ))}
        </div>
        <button
          name="continue"
          onClick={props.handleButtonClick}
          className="btn btn-warning"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Results;
