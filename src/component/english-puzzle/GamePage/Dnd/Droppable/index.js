import React from 'react';
import { connect } from 'react-redux';
import {
  changeResultArr, changeArrOfRandomWords,
} from '../../../redux/actions';

const Droppable = ({
  arrOfRandomWords,
  arrOfResult, id, children,
  changeResultArr, changeArrOfRandomWords, className,

}) => {
  const drop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('transfer');
    const elId = document.getElementById(data);

    if (e.target.className === elId.parentElement.className && e.target.classList.contains('result')) {
      const arr = arrOfResult.slice();

      [
        arr[elId.parentElement.id], arr[e.target.id],
      ] = [
        arr[e.target.id], arr[elId.parentElement.id],
      ];

      changeResultArr(arr);
    } else if (e.target.className === elId.parentElement.className) {
      const arr = arrOfRandomWords.slice();

      [
        arr[elId.parentElement.id], arr[e.target.id],
      ] = [
        arr[e.target.id], arr[elId.parentElement.id],
      ];

      changeArrOfRandomWords(arr);
    } else if (!elId.classList.contains('result')) {
      arrOfResult.splice(e.target.id, 1, elId.innerText);
      const i = elId.parentElement.id;
      arrOfRandomWords.splice(i, 1, e.target.innerText);
      changeResultArr(arrOfResult);
    } else if (elId.classList.contains('result')) {
      arrOfRandomWords.splice(e.target.id, 1, elId.innerText);
      const i = elId.parentElement.id;
      arrOfResult.splice(i, 1, e.target.innerText);
      changeArrOfRandomWords(arrOfRandomWords);
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
        className={className}
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
  changeResultArr, changeArrOfRandomWords,
};

export default connect(mapStateToProps, mapDispathToProps)(Droppable);
