import React, { Component } from 'react';
import Menu from './menu';
import Game from './game';
import { MENU_PAGE, GAME_PAGE } from './constants';
import { STATISTICS_PAGE } from '../audioChallenge/constants';
import Statistics from '../../statistics';

class SpeakIt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: MENU_PAGE,
      stats: null,
    };
  }

  setCurrentPage = (page) => {
    this.setState({ page });
  }

  setCurrentPageAndStatistics = (page, dataForStatistics) => {
    this.setState({ page, dataForStatistics });
  }

  render() {
    const { page, dataForStatistics } = this.state;

    if (page === MENU_PAGE) {
      return (<Menu setCurrentPage={this.setCurrentPage}></Menu>);
    } if (page === GAME_PAGE) {
      return (<Game setCurrentPage={this.setCurrentPageAndStatistics}></Game>);
    } if (page === STATISTICS_PAGE) {
      return (<Statistics data={dataForStatistics}></Statistics>);
    }

    return (<Menu setCurrentPage={this.setCurrentPage}></Menu>);
  }
}

export default SpeakIt;
