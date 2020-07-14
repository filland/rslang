import React, { useState } from 'react';
import Menu from './pages/menu';
import Game from './pages/game';
import Statistics from './pages/statistics';
import { MENU_PAGE, GAME_PAGE, STATISTICS_PAGE } from './constants';

function AudioChallenge() {
  const [page, setPage] = useState(MENU_PAGE);

  const setCurrentPage = (page) => {
    setPage(page);
  };

  if (page === MENU_PAGE) {
    return (<Menu setCurrentPage={setCurrentPage} />);
  } if (page === GAME_PAGE) {
    return (<Game setCurrentPage={setCurrentPage} />);
  } if (page === STATISTICS_PAGE) {
    return (<Statistics setCurrentPage={setCurrentPage}></Statistics>);
  }

  return (<Menu setCurrentPage={setCurrentPage} />);
}

export default AudioChallenge;
