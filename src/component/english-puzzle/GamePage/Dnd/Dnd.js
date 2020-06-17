import React from "react";
import Droppable from "./Droppable/index";
import Draggable from "./Draggable/index";
import "./Dnd.scss";

const Dnd = (props) => (
  <div className="dragndrop">
    <Droppable id="dr2">
      {props.isChecked
        ? props.arrOfResult.map((el, i) => (
          <Draggable
            className="draggable result"
            key={el + i}
            handleWordClick={props.handleWordClick}
            id={el}
          >
            {props.correctArr[i] === el ? (
              <span className="correct">{el}</span>
            ) : (
              <span className="error">{el}</span>
            )}
          </Draggable>
        ))
        : props.arrOfResult.map((el, i) => (
          <Draggable
            className="draggable result"
            key={el + i}
            handleWordClick={props.handleWordClick}
            id={el}
          >
            {el}
          </Draggable>
        ))}
    </Droppable>

    <Droppable id="dr1">
      {props.arrOfRandomWords.map((el, i) => (
        <Draggable
          className="draggable"
          key={el + i}
          handleWordClick={props.handleWordClick}
          id={el}
        >
          {el}
        </Draggable>
      ))}
    </Droppable>
  </div>
);

export default Dnd;
