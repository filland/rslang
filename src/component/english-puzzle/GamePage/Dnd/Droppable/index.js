import React from 'react';
import { connect } from 'react-redux';
import {
  pushWordInResultArr,
  dellWordFromResultArr,
} from '../../../redux/actions';

const Droppable = ({
  arrOfRandomWords, dellWordFromResultArr, arrOfResult, pushWordInResultArr, id, children,
}) => {
  const drop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('transfer');
    const elId = document.getElementById(data);

    if (
      elId.classList.contains('result')
      || elId.classList.contains('error')
      || (elId.classList.contains('correct')
        && e.target.id !== elId.parentElement.id)
    ) {
      dellWordFromResultArr(
        arrOfRandomWords,
        data,
        arrOfResult,
      );
    } else if (e.target.id !== elId.parentElement.id) {
      pushWordInResultArr(
        arrOfRandomWords,
        data,
        arrOfResult,
      );
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
      <div
        id={id}
        onDrop={drop}
        onDragOver={allowDrop}
        className="droppable"
      >
        {children}
      </div>
  );
};

const mapStateToProps = (state) => ({
  arrOfRandomWords: state.puzzleGame.arrOfRandomWords,
  arrOfResult: state.puzzleGame.arrOfResult,
});

const mapDispathToProps = {
  pushWordInResultArr,
  dellWordFromResultArr,
};

export default connect(mapStateToProps, mapDispathToProps)(Droppable);
