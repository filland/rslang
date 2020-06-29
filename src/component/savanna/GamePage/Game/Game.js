import React from 'react';
import heartImg from '../../assets/heart-solid.svg';
import './style.scss';

const Game = (props) => {
  const answer = React.createRef();

  const handleAnswer = ({ target }) => {
    const {
      changeWord, checkAnswer, currentPage, currentLevel, numOfCurrentWord, data, lifesCount,
      iKnowArr, iDontKnowArr, currentWordData,
    } = props;

    if (!target.parentElement.classList.contains('clicked')) {
      checkAnswer(target, answer.current, lifesCount, iKnowArr, iDontKnowArr, currentWordData);
      target.parentElement.classList.add('clicked');

      setTimeout(() => {
        const arr = target.parentElement.childNodes;

        for (let i = 0; i < arr.length; i += 1) {
          arr[i].className = 'answer';
        }
        target.parentElement.classList.remove('clicked');
        changeWord(currentPage, currentLevel, numOfCurrentWord + 1, data);
      }, 2000);
    }
  };

  const arr = new Array(props.lifesCount).fill('');

  return (
  <>
    <div className='lifesCount'>
      {arr.map((el, i) => (
        <img src={heartImg} alt='life' key={i} />
      ))}
    </div>
    <div className='currentWord' ref={answer} id={props.currentWordData.wordTranslate}>
      {props.currentWordData.word}
    </div>
    <div className='wordsForAnswer'>
      {props.arrOfRandomWords.map((el, i) => (
        <div className='answer' key={el.wordTranslate} id={el.wordTranslate} onClick={handleAnswer}>
          {i + 1}. {el.wordTranslate}
        </div>
      ))}
    </div>
  </>
  );
};

export default Game;
