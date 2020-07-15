import React, { useState } from 'react';
import Menu from './pages/menu';
import Game from './pages/game';
import Statistics from './pages/statistics';
import { MENU_PAGE, GAME_PAGE, STATISTICS_PAGE } from './constants';
import './styles.scss';

function AudioChallenge() {
  const [page, setPage] = useState(MENU_PAGE);

  const setCurrentPage = (page) => {
    setPage(page);
  };

  return (
    <div className="audioChallenge">
      {(page === GAME_PAGE) && <Game setCurrentPage={setCurrentPage} />}
      {(page === STATISTICS_PAGE) && <Statistics setCurrentPage={setCurrentPage}></Statistics>}
      {(page === MENU_PAGE) && <Menu setCurrentPage={setCurrentPage} />}
    </div>
  );
}

export default AudioChallenge;
