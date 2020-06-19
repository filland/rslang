import React, { useRef } from 'react';
import playImg from '../../assets/images/play-circle-regular.svg';
import autoPlayImgOn from '../../assets/images/volume-up-solid.svg';
import autoPlayImgOff from '../../assets/images/volume-mute-solid.svg';
import translateImg from '../../assets/images/file-alt-regular.svg';
import ChangeLevel from '../ChangeLevel';

const Hints = (props) => {
  const audioRef = useRef();
  return (
    <>
      <div className="hints">
        <ChangeLevel />
        <div className="gameTools">
          <div className="translate">
            <img
              src={translateImg}
              alt="translate"
              onClick={props.handleGameTools}
            />
          </div>
          <div className="play">
            <img src={playImg} alt="play" onClick={props.handleGameTools} />
          </div>
          <div className="autoPlay">
            {props.autoPlay ? (
              <img
                src={autoPlayImgOn}
                alt="autoPlay"
                onClick={props.handleGameTools}
              />
            ) : (
              <img
                src={autoPlayImgOff}
                alt="autoPlay"
                onClick={props.handleGameTools}
              />
            )}
          </div>
        </div>
      </div>
      <div className="translateText">
        {props.translateIsShowed
          ? props.arrayOfData[props.numberOfStr].textExampleTranslate
          : ''}
        <audio
          src={`https://raw.githubusercontent.com/liplyanin/rslang-data/master/${
            props.arrayOfData[props.numberOfStr].audioExample
          }`}
          ref={audioRef}
        />
      </div>
    </>
  );
};

export default Hints;
