import React from 'react';
import { Button } from 'react-bootstrap';
import { GAME_PAGE } from '../../constants';
import './styles.scss';

export default function Menu({ setCurrentPage }) {
  return (
    <div className="audioChallenge__menu">
      <Button onClick={() => setCurrentPage(GAME_PAGE)}>Start</Button>
    </div>
  );
}
