import React, { Component } from 'react';
import Btn from '../../../common/Btn';
import { MENU_PAGE } from '../constants';
import { default as ShortTermStatistics } from '../../../statistics';
import './styles.scss';

class Statistics extends Component {
  backToMenu = () => {
    const { setCurrentPage } = this.props;
    setCurrentPage(MENU_PAGE);
  }

  render() {
    const { data } = this.props;
    return (<div className="speakit-statistics-wrapper">
      <ShortTermStatistics data={data}></ShortTermStatistics>
      <div className="speakit-statistics-back">
        <Btn variant="primary" onClick={this.backToMenu}>Back to menu</Btn>
      </div>
    </div>);
  }
}

export default Statistics;
