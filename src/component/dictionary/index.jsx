import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Tabs, Tab, CardDeck,
} from 'react-bootstrap';

import Loader from '../common/loader';
import CardWord from './cardWordClass';

import fetchWordService from './service';
import './styles.css';
import {
  getWordsSelector,
  getWordCountSelector,
  getWordCountTodaySelector,
  getLosingFlagSelector,
} from './selectors';

const propTypes = {
  fetchWord: PropTypes.func.isRequired,
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
  wordCount: PropTypes.number.isRequired,
  wordCountToday: PropTypes.number.isRequired,
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

          <CardDeck className="my-4">
            {words.map((item, i) => <CardWord key={i} word={item} audioRef={this.audioRef} />)}
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
  wordCount: getWordCountSelector(store),
  wordCountToday: getWordCountTodaySelector(store),
  isLoading: getLosingFlagSelector(store),
});

const mapDispatchToProps = {
  fetchWord: fetchWordService,
};

Dictionary.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);
