import React, { useState } from 'react';
import Menu from './pages/menu';
import Game from './pages/game/index';
import { MENU_PAGE, GAME_PAGE } from './constants';

function AudioChallenge() {
  const [page, setPage] = useState(MENU_PAGE);

  const setCurrentPage = (page) => {
    setPage(page);
  };

  if (page === MENU_PAGE) {
    return (<Menu setCurrentPage={setCurrentPage} />);
  } if (page === GAME_PAGE) {
    return (<Game setCurrentPage={setCurrentPage} />);
  }

  return (<Menu setCurrentPage={setCurrentPage} />);
}

export default AudioChallenge;
