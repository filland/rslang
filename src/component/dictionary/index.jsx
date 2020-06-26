import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Tabs, Tab, CardDeck,
} from 'react-bootstrap';

import Loader from '../common/loader';
import CardWord from './cardWord/index';

import fetchWordService from './service';
import {
  getWordsSelector,
  getWordCountSelector,
  getWordCountTodaySelector,
  getLosingFlagSelector,
} from './selectors';

const propTypes = {
  fetchWord: PropTypes.func.isRequired,
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
  wordsDifficult: PropTypes.arrayOf(PropTypes.object).isRequired,
  wordsDeleted: PropTypes.arrayOf(PropTypes.object).isRequired,

  wordCount: PropTypes.number.isRequired,
  wordCountToday: PropTypes.number.isRequired,
  wordCountDifficult: PropTypes.number.isRequired,
  wordCountTodayDifficult: PropTypes.number.isRequired,
  wordCountDeleted: PropTypes.number.isRequired,
  wordCountTodayDeleted: PropTypes.number.isRequired,

  isLoading: PropTypes.bool.isRequired,
};

class Dictionary extends Component {
  componentDidMount() {
    const { fetchWord } = this.props;
    fetchWord();
  }

  render() {
    const {
      words, isLoading, wordCount, wordCountToday,
    } = this.props;

    if (isLoading) {
      return (<Loader />);
    }
    return (
      <Tabs defaultActiveKey="learn" id="dictionary-tab-mode">
        <Tab eventKey="learn" title="Изучаемые слова">
          <div className="my-4">
            {`Число слов: ${wordCount} (${wordCountToday} сегодня)`}
          </div>
          <CardDeck className="my-4 justify-content-between">
            {words.map((item, i) => <CardWord key={i} word={item} />)}
          </CardDeck>
        </Tab>
        <Tab eventKey="difficult" title="Сложные слова">
          <div className="my-4">
            {`Число слов: ${wordCountDifficult} (${wordCountToday} сегодня)`}
          </div>
          <CardDeck className="my-4 justify-content-between">
            {words.map((item, i) => <CardWord key={i} word={item} />)}
          </CardDeck>
        </Tab>
        <Tab eventKey="deleted" title="Удалённые слова">
          <div className="my-4">
            {`Число слов: ${wordCount} (${wordCountToday} сегодня)`}
          </div>
          <CardDeck className="my-4 justify-content-between">
            {words.map((item, i) => <CardWord key={i} word={item} />)}
          </CardDeck>
        </Tab>
      </Tabs>
    );
  }
}
const mapStateToProps = (store) => ({
  words: getWordsSelector(store),
  wordCount: getWordCountSelector(store),
  wordCountToday: getWordCountTodaySelector(store),
  isLoading: getLosingFlagSelector(store),
});

const mapDispatchToProps = {
  fetchWord: fetchWordService,
};

Dictionary.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);
