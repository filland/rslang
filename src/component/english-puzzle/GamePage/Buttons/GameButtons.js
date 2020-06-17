import React from 'react';

const GameButtons = (props) => {
  return (
    <div className="gameButtons">
      {props.isDone || props.imgIsShowed ? (
        <button
          onClick={props.handleButtonClick}
          name="continue"
          className="btn btn-success"
        >
          Continue
        </button>
      ) : (
        <button
          onClick={props.handleButtonClick}
          name="check"
          className="btn btn-info"
        >
          Check
        </button>
      )}
      {props.arrOfRandomWords.length === 0 &&
      !props.isDone &&
      props.isChecked ? (
        <button
          onClick={props.handleButtonClick}
          name="show result"
          className="btn btn-warning"
        >
          I don't know
        </button>
      ) : (
        ''
      )}
      {props.imgIsShowed ? (
        <button
          name="results"
          onClick={props.handleButtonClick}
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
