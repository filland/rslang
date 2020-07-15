import React from 'react';
import playImg from '../../assets/images/play-circle-regular.svg';

import './Results.scss';

const Results = ({
  pictureData, iDontKnowArr, iKnowArr, handleButtonClick,
}) => {
  const playAudio = (e) => {
    e.target.nextElementSibling.play();
  };
  return (
    <div className="backgroundOfStatistics">
      <div className="statistics">
        <div className="pictureData">
          <div className="picture">
            <img
              src={`https://raw.githubusercontent.com/liplyanin/rslang_data_paintings/master/${pictureData.imageSrc}`}
              alt="img"
            />
          </div>
          <span>
            {pictureData.author}
            {' '}
            -
            {' '}
            {pictureData.name}
            {' '}
            (
            {pictureData.year}
            )
          </span>
        </div>
        <div className="iKnow">
          <span>
            <b>I know:</b>
            {' '}
          </span>
          {iKnowArr.map((el, i) => (
            <div className="item" key={(el, i)}>
              <img src={playImg} alt="play" onClick={playAudio} />
              <audio
                src={`https://raw.githubusercontent.com/liplyanin/rslang-data/master/${el.audioExample}`}
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
          {iDontKnowArr.map((el, i) => (
            <div className="item" key={(el, i)}>
              <img src={playImg} alt="play" onClick={playAudio} />
              <audio
                src={`https://raw.githubusercontent.com/liplyanin/rslang-data/master/${el.audioExample}`}
                id={el.word}
              />
              {el.str}
            </div>
          ))}
        </div>
        <button
          name="continue"
          onClick={handleButtonClick}
          className="btn btn-warning"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Results;
