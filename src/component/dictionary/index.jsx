/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
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
  getLosingFlagSelector,
} from './selectors';

const propTypes = {
  fetchWord: PropTypes.func.isRequired,
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

class Dictionary extends Component {
  componentDidMount() {
    const { fetchWord } = this.props;
    fetchWord();
  }

  render() {
    const {
      isLoading, words, dictionaryWords, userWords,
    } = this.props;
    console.log(dictionaryWords);
    console.log(userWords);

    const wordsDeletedList = words.filter((x) => Object.prototype.hasOwnProperty.call(x, 'optionalDeleted') && x.optionalDeleted);
    const wordsDifficultList = words.filter((x) => Object.prototype.hasOwnProperty.call(x, 'difficulty') && (x.difficulty === 'hard') && !wordsDeletedList.includes(x));
    const wordsLearningList = words.filter((x) => !wordsDifficultList.includes(x) && !wordsDeletedList.includes(x));

    const wordsDeletedToday = wordsDeletedList.filter(({ optionalUpdatedDateToNowDays }) => optionalUpdatedDateToNowDays === 0).length;
    const wordsDifficultToday = wordsDifficultList.filter(({ optionalUpdatedDateToNowDays }) => optionalUpdatedDateToNowDays === 0).length;
    const wordsLearningToday = wordsLearningList.filter(({ optionalUpdatedDateToNowDays }) => optionalUpdatedDateToNowDays === 0).length;

    console.log('---------------');

    if (isLoading) {
      return (<Loader />);
    }

    return (
      <Tabs defaultActiveKey="learn" id="dictionary-tab-mode">
        <Tab eventKey="learn" title="Изучаемые слова">
          <div className="my-4">
            {`Число слов: ${wordsLearningList.length} (${wordsLearningToday} сегодня)`}
          </div>
          <CardDeck className="my-4 justify-content-between">
            {wordsLearningList.map((item, i) => <CardWord key={i} word={item} restoreButton="false" />)}
          </CardDeck>
        </Tab>
        <Tab eventKey="difficult" title="Сложные слова">
          <div className="my-4">
            {`Число слов: ${wordsDifficultList.length} (${wordsDifficultToday} сегодня)`}
          </div>
          <CardDeck className="my-4 justify-content-between">
            {wordsDifficultList.map((item, i) => <CardWord key={i} word={item} restoreButton="difficult" />)}
          </CardDeck>
        </Tab>
        <Tab eventKey="deleted" title="Удалённые слова">
          <div className="my-4">
            {`Число слов: ${wordsDeletedList.length} (${wordsDeletedToday} сегодня)`}
          </div>
          <CardDeck className="my-4 justify-content-between">
            {wordsDeletedList.map((item, i) => <CardWord key={i} word={item} restoreButton="delete" />)}
          </CardDeck>
        </Tab>
      </Tabs>
    );
  }
}
const mapStateToProps = (store) => ({
  words: getWordsSelector(store),
  isLoading: getLosingFlagSelector(store),
  dictionaryWords: getDictionaryWords(store),
  userWords: getUserWords(store),
});

const mapDispatchToProps = {
  fetchWord: fetchWordService,
};

Dictionary.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);
