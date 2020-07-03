import React from 'react';
import startPageImg from '../assets/backgroundStartPage.jpg';
import Loader from '../../common/loader/index';
import './style.scss';

const StartPage = ({ startGame, getWords, dictionaryWords }) => {
  const handleCick = () => {
    startGame();
    getWords();
  };
  return (
    <div className='startPage' style={{ backgroundImage: `url(${startPageImg})` }}>
      <div className='description'>
        The game develops vocabulary. For answer you can use mouse or keyboard.
    </div>
    {dictionaryWords.length === 0
      ? <Loader/>
      : <button onClick={handleCick} className='btn btn-primary'>Start</button>
    }

    </div>
  );
};

export default StartPage;
