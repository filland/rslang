/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Tabs, Tab, CardDeck, Container, Row,
} from 'react-bootstrap';

import Loader from '../common/loader';
import CardWorld from './cardWorldClass';

import { fetchWorldService } from './service';
import './styles.css';
import {
  getWordsSelector,
  getWorldCountSelector,
  getWorldCountTodaySelector,
  getLosingFlagSelector,
} from './selectors';

const propTypes = {
  fetchWorld: PropTypes.func.isRequired,
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
  worldCount: PropTypes.number.isRequired,
  worldCountToday: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

// eslint-disable-next-line react/prefer-stateless-function
class Dictionary extends Component {
  componentDidMount() {
    const { fetchWorld } = this.props;
    fetchWorld();
  }

  render() {
    const {
      words, isLoading, worldCount, worldCountToday,
    } = this.props;
    console.log(words);

    if (isLoading) {
      return (<Loader />);
    }
    return (
      <Tabs defaultActiveKey="learn" id="dictionary-tab-mode">
        <Tab eventKey="learn" title="Изучаемые слова">
          <div className="my-4">
            {`Число слов: ${worldCount} (${worldCountToday} сегодня)`}
          </div>

          <CardDeck className="my-4">
            {words.map((item, i) => <CardWorld key={i} world={item} />)}
          </CardDeck>
        </Tab>
        <Tab eventKey="difficult" title="Сложные слова" disabled>
          tab-2
        </Tab>
        <Tab eventKey="deleted" title="Удалённые слова" disabled>
          tab-3
        </Tab>
      </Tabs>
    );
  }
}

const mapStateToProps = (store) => ({
  words: getWordsSelector(store),
  worldCount: getWorldCountSelector(store),
  worldCountToday: getWorldCountTodaySelector(store),
  isLoading: getLosingFlagSelector(store),
});

const mapDispatchToProps = {
  fetchWorld: fetchWorldService,
};

Dictionary.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);
