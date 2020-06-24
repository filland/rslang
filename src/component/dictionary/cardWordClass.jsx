import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card, ListGroup, ListGroupItem,
} from 'react-bootstrap';
import './styles.css';

import playImg from './assets/images/audioPlayWord.png';

const propTypes = {
  word: PropTypes.objectOf(PropTypes.any).isRequired,
  audioRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};
const gitUrlword = 'https://raw.githubusercontent.com/agnusha/rslang-data/master/';

class Cardword extends Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
  }

  playAudio = () => {
    console.log('handleGameTools: ');
    if (this.audioRef.current) {
      console.log('this.audioRef.current: ', this.audioRef.current);
      this.audioRef.current.play();
    }
  };

  render() {
    const { word } = this.props;
    return (
      <Card bg="Light" className="wordCard">
        <Card.Img variant="top" src={gitUrlword + word.image} />
        <Card.Body>
          <Card.Title>{word.word}</Card.Title>
          <Card.Text>{word.wordTranslate}</Card.Text>
          <Card.Text>
            {word.transcription}
            {word.textMeaning}&nbsp;
            {/* <img src={playImg} width="25" height="25" alt="play" onClick={this.playAudio} />
            <audio src={gitUrlword + word.audio} ref={this.audioRef} /> */}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            {word.textMeaning}&nbsp;
            <img src={playImg} width="25" height="25" alt="play" onClick={this.playAudio} />
            <audio src={gitUrlword + word.audioMeaning} ref={this.audioRef} />
          </ListGroupItem>
          <ListGroupItem>{word.textMeaningTranslate}</ListGroupItem>
          <ListGroupItem>{word.textExample}</ListGroupItem>
          <ListGroupItem>{word.textExampleTranslate}</ListGroupItem>
          <audio controls><source src={gitUrlword + word.audioExample} /></audio>
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
}

Cardword.propTypes = propTypes;
export default Cardword;
