import React from 'react';
import heartImg from '../../assets/heart-solid.svg';
import startGameAudio from '../../assets/start.mp3';
import volomeOn from '../../../english-puzzle/assets/images/volume-up-solid.svg';
import volomeOff from '../../../english-puzzle/assets/images/volume-mute-solid.svg';

import './style.scss';

const Game = ({
  changeWord, checkAnswer, currentPage, currentLevel, numOfCurrentWord, data, lifesCount,
  iKnowArr, iDontKnowArr, currentWordData, arrOfRandomWords, checkingAnswer,
  errorAudioRef, correctAudioRef, audioOn, changeVolume,
}) => {
  const answer = React.createRef();

  const handleAnswer = ({ target }) => {
    if (!checkingAnswer) {
      if (target.id === answer.current.id) {
        target.classList.add('true');
        if (audioOn) {
          correctAudioRef.current.play();
        }
      } else {
        const arr = target.parentElement.childNodes;
        for (let i = 0; i < arr.length; i += 1) {
          if (arr[i].id === answer.current.id) {
            arr[i].classList.add('true');
          }
        }
        target.classList.add('false');
        if (audioOn) {
          errorAudioRef.current.play();
        }
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
  const changeVolumeHandler = () => {
    changeVolume(audioOn);
  };

  const arr = new Array(lifesCount).fill('');
  return (
  <>
  <audio src={startGameAudio} autoPlay={audioOn}></audio>
    <div className='volume' onClick={changeVolumeHandler}>
    {
      audioOn
        ? <img src={volomeOn} alt='audio'/>
        : <img src={volomeOff} alt='audio'/>
    }
    </div>
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
