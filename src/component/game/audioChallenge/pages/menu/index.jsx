import React from 'react';
import PropTypes from 'prop-types';
import Btn from '../../../../common/Btn';
import { GAME_PAGE } from '../../constants';
import './styles.scss';

export default function Menu({ setCurrentPage }) {
  return (
    <div className="menu">
      <Btn onClick={() => setCurrentPage(GAME_PAGE)}>Start</Btn>
    </div>
  );
}

Menu.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};
