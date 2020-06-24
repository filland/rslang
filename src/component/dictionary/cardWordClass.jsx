import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card, ListGroup, ListGroupItem,
} from 'react-bootstrap';
import './styles.css';
import { GIT_URL_WORD } from './constants';

import playImg from './assets/images/audioPlayWord.png';

const propTypes = {
  word: PropTypes.objectOf(PropTypes.any).isRequired,
  audioRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

class Cardword extends Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
  }

  render() {
    const { word, audioRef } = this.props;
    return (
      <Card bg="Light" className="wordCard">
        <Card.Img variant="top" src={GIT_URL_WORD + word.image} />
        <Card.Body>
          <Card.Title>{word.word}</Card.Title>
          <Card.Text>{word.wordTranslate}</Card.Text>
          <Card.Text>{word.transcription}</Card.Text>
          <audio controls><source src={GIT_URL_WORD + word.audio} /></audio>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>{word.textMeaning}</ListGroupItem>
          <ListGroupItem>{word.textMeaningTranslate}</ListGroupItem>
          <audio controls><source src={GIT_URL_WORD + word.audioMeaning} /></audio>

          <div className="play-word">
            <img src={playImg} width="25" height="25" alt="play" onClick={this.handleGameTools(audioRef)} />
          </div>
          <audio controls src={GIT_URL_WORD + word.audioMeaning} ref={this.audioRef} />

          <ListGroupItem>{word.textExample}</ListGroupItem>
          <ListGroupItem>{word.textExampleTranslate}</ListGroupItem>
          <audio controls><source src={GIT_URL_WORD + word.audioExample} /></audio>

        </ListGroup>
        <Card.Footer>
          {/* todo: add info from back */}
          {/* todo: add img to difficulty */}
          <div>{word.difficulty}</div>
          <div>
            <span>Давность: 11 дней назад | </span>
            <span>Повторений: 3 | </span>
            <span>Следующее: 20.03.2020 | </span>
          </div>
        </Card.Footer>
      </Card>
    );
  }

  handleGameTools = () => {
    console.log(this);
    // this is null
    console.log(this.audioRef.current);
    if (this.audioRef.current) this.audioRef.current.play();

  };
}

Cardword.propTypes = propTypes;
export default Cardword;
