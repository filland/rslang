import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Tabs, Tab, CardDeck,
} from 'react-bootstrap';

import Loader from '../common/loader';
import CardWord from './cardWord/index';

import fetchWordService from './service';

import getUserWords from '../common/word/user-word/selectors';
import getDictionaryWords from '../common/word/dictionary-word/selectors';

import {
  getWordsSelector,
  getWordCountSelector,
  getWordCountTodaySelector,
  getWordsDifficultSelector,
  getWordDifficultCountSelector,
  getWordDifficultCountTodaySelector,
  getWordsDeletedSelector,
  getWordDeletedCountSelector,
  getWordDeletedCountTodaySelector,
  getLosingFlagSelector,
} from './selectors';

const propTypes = {
  fetchWord: PropTypes.func.isRequired,
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
  wordsDifficult: PropTypes.arrayOf(PropTypes.object).isRequired,
  wordsDeleted: PropTypes.arrayOf(PropTypes.object).isRequired,

  wordCount: PropTypes.number.isRequired,
  wordCountToday: PropTypes.number.isRequired,
  wordDifficultCount: PropTypes.number.isRequired,
  wordDifficultCountToday: PropTypes.number.isRequired,
  wordDeletedCount: PropTypes.number.isRequired,
  wordDeletedCountToday: PropTypes.number.isRequired,

  isLoading: PropTypes.bool.isRequired,
};

class Dictionary extends Component {
  componentDidMount() {
    // update it after connecting to redux store
    const { fetchWord/* , fetchWordDifficult, fetchWordDeleted */ } = this.props;
    fetchWord();
    // fetchWordDifficult();
    // fetchWordDeleted();
  }

  render() {
    const {
      isLoading, words, wordCountToday,
      wordsDifficult, wordDifficultCount, wordDifficultCountToday,
      wordsDeleted, wordDeletedCount, wordDeletedCountToday, dictionaryWords, userWords,
    } = this.props;

    console.log(dictionaryWords);
    console.log(userWords);

    if (isLoading) {
      return (<Loader />);
    }

    return (
      <Tabs defaultActiveKey="learn" id="dictionary-tab-mode">
        <Tab eventKey="learn" title="Изучаемые слова">
          <div className="my-4">
            {`Число слов: ${words.length} (${wordCountToday} сегодня)`}
          </div>
          <CardDeck className="my-4 justify-content-between">
            {words.map((item, i) => <CardWord key={i} word={item} />)}
          </CardDeck>
        </Tab>
        <Tab eventKey="difficult" title="Сложные слова">
          <div className="my-4">
            {`Число слов: ${wordDifficultCount} (${wordDifficultCountToday} сегодня)`}
          </div>
          <CardDeck className="my-4 justify-content-between">
            {wordsDifficult.map((item, i) => <CardWord key={i} word={item} />)}
          </CardDeck>
        </Tab>
        <Tab eventKey="deleted" title="Удалённые слова">
          <div className="my-4">
            {`Число слов: ${wordDeletedCount} (${wordDeletedCountToday} сегодня)`}
          </div>
          <CardDeck className="my-4 justify-content-between">
            {wordsDeleted.map((item, i) => <CardWord key={i} word={item} />)}
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
  wordsDifficult: getWordsDifficultSelector(store),
  wordDifficultCount: getWordDifficultCountSelector(store),
  wordDifficultCountToday: getWordDifficultCountTodaySelector(store),
  wordsDeleted: getWordsDeletedSelector(store),
  wordDeletedCount: getWordDeletedCountSelector(store),
  wordDeletedCountToday: getWordDeletedCountTodaySelector(store),
  isLoading: getLosingFlagSelector(store),
  dictionaryWords: getDictionaryWords(store),
  userWords: getUserWords(store),
});

const mapDispatchToProps = {
  fetchWord: fetchWordService,
};

Dictionary.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);
