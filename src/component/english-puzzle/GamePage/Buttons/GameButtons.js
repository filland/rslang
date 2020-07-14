import React from 'react';
import Btn from '../../../common/Btn';

const GameButtons = ({
  isChecked, isDone, imgIsShowed, handleButtonClick, arrOfRandomWords,
}) => {
  const isShowButton = arrOfRandomWords.every((el) => el === '') && !isDone && isChecked;

  return (
    <div className="gameButtons">
      {isDone || imgIsShowed ? (
        <Btn
          onClick={handleButtonClick}
          name="continue"
          className="btn btn-success"
        >
          Continue
        </Btn>
      ) : (
          <Btn
            onClick={handleButtonClick}
            name="check"
            className="btn btn-info"
          >
            Check
          </Btn>
        )}
      {isShowButton ? (
        <Btn
          onClick={handleButtonClick}
          name="show result"
          className="btn btn-warning"
        >
          I don't know
        </Btn>
      ) : (
          ''
        )}
      {imgIsShowed ? (
        <Btn
          name="results"
          onClick={handleButtonClick}
          className="btn btn-primary"
        >
          Results
        </Btn>
      ) : (
          ''
        )}
    </div>
  );
};

export default GameButtons;
