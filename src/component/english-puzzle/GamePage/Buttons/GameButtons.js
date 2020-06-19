import React from 'react';

const GameButtons = ({
  isChecked, isDone, imgIsShowed, handleButtonClick, arrOfRandomWords,
}) => {
  const isShowButton = arrOfRandomWords.length === 0 && !isDone && isChecked;

  return (
    <div className="gameButtons">
      {isDone || imgIsShowed ? (
        <button
          onClick={handleButtonClick}
          name="continue"
          className="btn btn-success"
        >
          Continue
        </button>
      ) : (
        <button
          onClick={handleButtonClick}
          name="check"
          className="btn btn-info"
        >
          Check
        </button>
      )}
      { isShowButton ? (
        <button
          onClick={handleButtonClick}
          name="show result"
          className="btn btn-warning"
        >
          I don't know
        </button>
      ) : (
        ''
      )}
      {imgIsShowed ? (
        <button
          name="results"
          onClick={handleButtonClick}
          className="btn btn-primary"
        >
          Results
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default GameButtons;
