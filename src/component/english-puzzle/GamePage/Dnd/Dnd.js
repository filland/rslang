import React from 'react';
import Droppable from './Droppable/index';
import Draggable from './Draggable/index';
import './Dnd.scss';

const Dnd = ({
  isChecked, arrOfResult, handleWordClick, correctArr, arrOfRandomWords, disableIsChecked,
}) => (

    <div className="dragndrop">

      <div className='dndResult'>
        {!isChecked
          ? arrOfResult.map((el, i) => (
            <Droppable id={i} key={`e${i}`} className='droppable result'>

              <Draggable
                className="draggable result"
                handleWordClick={handleWordClick}
                onMouseDown={disableIsChecked}
                id={el}
              >
                {el}
              </Draggable>
            </Droppable>

          )) : arrOfResult.map((el, i) => (
            <Droppable id={20 + i} key={`e${i}`} className='droppable result'>
              <Draggable
                className="draggable result"
                handleWordClick={handleWordClick}
                onMouseDown={disableIsChecked}

                id={el}
              >
                    {correctArr[i] === el ? (
              <span className="correct">{el}</span>
                    ) : (
              <span className="error">{el}</span>
                    )}
              </Draggable>
            </Droppable>

          ))}
      </div>

      <div className='dndData'>
        {arrOfRandomWords.map((el, i) => (
          <Droppable id={i} key={el + i} className='droppable'>

            <Draggable
              className="draggable"
              onMouseDown={disableIsChecked}
              handleWordClick={handleWordClick}
              id={el + i}
            >
              {el}
            </Draggable>
          </Droppable>

        ))}
      </div>
    </div>
);

export default Dnd;
