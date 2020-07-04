import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { GAME_PAGE } from '../../constants';
import './styles.scss';

export default function Menu({ setCurrentPage }) {
  return (
    <div className="menu">
      <Button onClick={() => setCurrentPage(GAME_PAGE)}>Start</Button>
    </div>
  );
}

Menu.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};
