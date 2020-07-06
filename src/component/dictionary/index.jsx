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

import getUserWords from '../common/word/user-word/selectors';

import { getWordTodayCount } from './utils';
import {
  getLosingFlagSelector,
} from './selectors';

const propTypes = {
  userWords: PropTypes.arrayOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

class Dictionary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userWords: props.userWords,
    };
    this.handlerRestore = this.handlerRestore.bind(this);
  }

  // componentDidMount() {
  //   const { getUserWords } = this.props;
  //   getUserWords();
  // }

  componentDidUpdate(nextProps) {
    console.log('update');
    if (JSON.stringify(nextProps.userWords) !== JSON.stringify(this.props.userWords)) {
      this.setState({ userWords: this.props.userWords });
    }
  }

  handlerRestore = async () => {
    console.log('handlerRestore');

    // const { setUserWords } = this.props;
    // setUserWords(this.state.userWords);
  }

  render() {
    const {
      isLoading, userWords,
    } = this.props;

    console.log(userWords);
    console.log(this.state);

    const wordsDeletedList = this.state.userWords.filter((x) => x.optional && x.optional.deleted);
    const wordsDifficultList = this.state.userWords.filter((x) => x.difficulty && x.difficulty === 'hard' && !wordsDeletedList.includes(x));
    const wordsLearningList = this.state.userWords.filter((x) => !wordsDifficultList.includes(x) && !wordsDeletedList.includes(x));

    if (isLoading) {
      return (<Loader />);
    }

    return (
      <Tabs defaultActiveKey="learn" id="dictionary-tab-mode" >
        <Tab eventKey="learn" title="Изучаемые слова">
          <div className="my-4">
            {`Число слов: ${wordsLearningList.length} (${getWordTodayCount(wordsLearningList)} сегодня)`}
          </div>
          <CardDeck className="my-4 justify-content-between">
            {wordsLearningList.map((item, i) => <CardWord key={i} word={item} restoreButton="false" />)}
          </CardDeck>
        </Tab>
        <Tab eventKey="difficult" title="Сложные слова">
          <div className="my-4">
            {`Число слов: ${wordsDifficultList.length} (${getWordTodayCount(wordsDifficultList)} сегодня)`}
          </div>
          <CardDeck className="my-4 justify-content-between">
            {wordsDifficultList.map((item, i) => <CardWord key={i} word={item} restoreButton="difficult" handlerRestore={this.handlerRestore} />)}
          </CardDeck>
        </Tab>
        <Tab eventKey="deleted" title="Удалённые слова">
          <div className="my-4">
            {`Число слов: ${wordsDeletedList.length} (${getWordTodayCount(wordsDeletedList)} сегодня)`}
          </div>
          <CardDeck className="my-4 justify-content-between">
            {wordsDeletedList.map((item, i) => <CardWord key={i} word={item} restoreButton="delete" handlerRestore={this.handlerRestore} />)}
          </CardDeck>
        </Tab>
      </Tabs>
    );
  }
}

const mapStateToProps = (store) => ({
  isLoading: getLosingFlagSelector(store),
  userWords: getUserWords(store),
});

const mapDispatchToProps = {
  getUserWords,
};

Dictionary.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);
