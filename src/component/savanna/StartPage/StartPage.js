import React from 'react';
import startPageImg from '../assets/backgroundStartPage.jpg';
import './style.scss';

const StartPage = ({ startGame, getWords }) => {
  const handleCick = () => {
    startGame();
    getWords();
  };
  return (
    <div className='startPage' style={{ backgroundImage: `url(${startPageImg})` }}>
      <div className='description'>
        The game develops vocabulary. For answer you can use mouse or keyboard.
    </div>

       <button onClick={handleCick} className='btn btn-primary'>Start</button>

    </div>
  );
};

export default StartPage;
