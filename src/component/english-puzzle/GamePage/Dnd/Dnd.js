import React from 'react';
import Droppable from './Droppable/index';
import Draggable from './Draggable/index';
import './Dnd.scss';

const Dnd = ({
  isChecked, arrOfResult, handleWordClick, correctArr, arrOfRandomWords,
}) => (
  <div className="dragndrop">
    <Droppable id="dr2">
      {isChecked
        ? arrOfResult.map((el, i) => (
          <Draggable
            className="draggable result"
            key={el + i}
            handleWordClick={handleWordClick}
            id={el}
          >
            {correctArr[i] === el ? (
              <span className="correct">{el}</span>
            ) : (
              <span className="error">{el}</span>
            )}
          </Draggable>
        ))
        : arrOfResult.map((el, i) => (
          <Draggable
            className="draggable result"
            key={el + i}
            handleWordClick={handleWordClick}
            id={el}
          >
            {el}
          </Draggable>
        ))}
    </Droppable>

    <Droppable id="dr1">
      {arrOfRandomWords.map((el, i) => (
        <Draggable
          className="draggable"
          key={el + i}
          handleWordClick={handleWordClick}
          id={el}
        >
          {el}
        </Draggable>
      ))}
    </Droppable>
  </div>
);

export default Dnd;
