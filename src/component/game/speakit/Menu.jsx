import React, { Component } from 'react';
import Difficulty from './Difficulty';
import { GAME_PAGE } from './constants';

class Menu extends Component {
  render() {
    const { setCurrentPage } = this.props;
    return (<div>
            <a href="#" onClick={() => setCurrentPage(GAME_PAGE)}>Start</a>
            <Difficulty></Difficulty>
        </div>);
  }
}

export default Menu;
