import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Tabs, Tab, CardDeck,
} from 'react-bootstrap';

import Loader from '../common/loader';
import CardWorld from './cardWorldClass';

import fetchWorldService from './service';
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

class Dictionary extends Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
  }

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
            {words.map((item, i) => <CardWorld key={i} world={item} audioRef={this.audioRef} />)}
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

  // handleGameTools = (audioRefLink) => {
  //   // audioRef.current.play();
  //   console.log(this);
  //   console.log(audioRefLink);

  //   // console.log(this.audioRef.current);
  //   // this.audioRef.current.play();
  // }
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
