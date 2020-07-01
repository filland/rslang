import React from 'react';
import heartImg from '../../assets/heart-solid.svg';
import './style.scss';

const Game = ({
  changeWord, checkAnswer, currentPage, currentLevel, numOfCurrentWord, data, lifesCount,
  iKnowArr, iDontKnowArr, currentWordData, arrOfRandomWords, checkingAnswer,
}) => {
  const answer = React.createRef();

  const handleAnswer = ({ target }) => {
    if (!checkingAnswer) {
      if (target.id === answer.current.id) {
        target.classList.add('true');
      } else {
        const arr = target.parentElement.childNodes;
        for (let i = 0; i < arr.length; i += 1) {
          if (arr[i].id === answer.current.id) {
            arr[i].classList.add('true');
          }
        }
        target.classList.add('false');
      }

      checkAnswer({
        target,
        answer: answer.current,
        lifesCount,
        iKnowArr,
        iDontKnowArr,
        currentWordData,
      });

      setTimeout(() => {
        changeWord(currentPage, currentLevel, numOfCurrentWord + 1, data);
        if (!checkingAnswer) {
          target.parentElement.childNodes.forEach((el) => el.classList.remove('true', 'false'));
        }
      }, 2000);
    }
  };

  const arr = new Array(lifesCount).fill('');
  return (
  <>
    <div className='lifesCount'>
      {arr.map((el, i) => (
        <img src={heartImg} alt='life' key={i} />
      ))}
    </div>
    <div className='currentWord' ref={answer} id={currentWordData.wordTranslate}>
      {currentWordData.word}
    </div>
    <div className='wordsForAnswer'>
      {arrOfRandomWords.map(({ wordTranslate }, i) => (
        <div className='answer' key={i} id={wordTranslate} onClick={handleAnswer}>
          {i + 1}. {wordTranslate}
        </div>
      ))}
    </div>
  </>
  );
};

export default Game;
