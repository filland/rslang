import React from 'react';
import resultsAudio from '../../assets/show_results.mp3';
import closeImg from '../../assets/close.svg';
import audioImg from '../../../english-puzzle/assets/images/play-circle-regular.svg';

import './style.scss';

const Statistics = ({
  iKnowArr, iDontKnowArr, endGame, audioOn, showWordData, wordDataIsShowing, dataOfClickedWord,
}) => {
  const handleClick = ({ target }) => {
    if (target.alt === 'play') {
      target.nextElementSibling.play();
    } else if (target.alt === 'close') {
      showWordData(wordDataIsShowing);
    } else {
      let data;
      if (target.className === 'knowArr') {
        data = iKnowArr[target.id];
      } else {
        data = iDontKnowArr[target.id];
      }
      showWordData(wordDataIsShowing, data);
    }
  };
  return (
    <div className='statistics'>
      <audio src={resultsAudio} autoPlay={audioOn}></audio>
      {
        wordDataIsShowing
          ? (<div className='popup wordData'>
           <div className='close'> <img src={closeImg} alt='close' onClick={handleClick}/></div>
              <div className='image'><img src={`https://raw.githubusercontent.com/liplyanin/rslang-data/master/${dataOfClickedWord.image}`} alt='img' /></div>
              <div className='currentWord'>{dataOfClickedWord.word}</div>
              <div className='transcription'>
                <img src={audioImg} alt='play' onClick={handleClick} />
                <audio src={`https://raw.githubusercontent.com/liplyanin/rslang-data/master/${dataOfClickedWord.audio}`}></audio>
                {dataOfClickedWord.transcription}
              </div>
              <div className='translate'>{dataOfClickedWord.wordTranslate}</div>
          </div>)
          : (<div className='popup'>
            <div className='iKnow'>
              <div className='name'>I know: </div>
              {iKnowArr.map(({ word, wordTranslate, audio }, i) => (
                <div className='item' key={i}> <img src={audioImg} alt='play' onClick={handleClick} />
                  <audio src={`https://raw.githubusercontent.com/liplyanin/rslang-data/master/${audio}`}></audio>
                  <span onClick={handleClick} id={i} className='knowArr'>{word}</span>  - {wordTranslate}
                </div>
              ))}
            </div>
            <div className='iDontKnow'>
              <div className='name'>I don't know:</div>
              {iDontKnowArr.map(({ word, wordTranslate, audio }, i) => (
                <div className='item' key={i}> <img src={audioImg} alt='play' onClick={handleClick} />
                  <audio src={`https://raw.githubusercontent.com/liplyanin/rslang-data/master/${audio}`}></audio>
                  <span onClick={handleClick} id={i} className='dontKnowArr'>{word}</span> - {wordTranslate} </div>
              ))}
            </div>
            <button onClick={endGame} className='btn btn-warning'> Continue </button>
          </div>)
      }
    </div>
  );
};

export default Statistics;
