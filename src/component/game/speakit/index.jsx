import React, { Component } from 'react';
import Menu from './Menu';
import Game from './Game';
import { MENU_PAGE, GAME_PAGE } from './constants';

class SpeakIt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: MENU_PAGE,
    };
  }

    setCurrentPage = (page) => {
      this.setState({ page });
    }

    render() {
      const { page } = this.state;

      if (page === MENU_PAGE) {
        return (<Menu setCurrentPage={this.setCurrentPage}></Menu>);
      } if (page === GAME_PAGE) {
        return (<Game setCurrentPage={this.setCurrentPage}></Game>);
      }

      return (<Menu setCurrentPage={this.setCurrentPage}></Menu>);
    }
}

export default SpeakIt;
