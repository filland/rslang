import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import {
  Card, ListGroup, ListGroupItem,
} from 'react-bootstrap';
import fetchWordServiceRestore from '../serviceRestore';

import { GIT_URL_WORD } from '../constants';
import playImg from '../assets/images/audioPlayWord.png';
import './styles.scss';

const propTypes = {
  word: PropTypes.objectOf(PropTypes.any).isRequired,
  restoreButton: PropTypes.string.isRequired,
  audioRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

class Cardword extends Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.audioMeaningRef = React.createRef();
    this.audioExampleRef = React.createRef();
  }

  restoreWord = () => {
    fetchWordServiceRestore(this.props.word.id, this.props.restoreButton);
  };

  playAudio = () => {
    if (this.audioRef.current) {
      this.audioRef.current.play();
    }
  };

  playAudioMeaning = () => {
    if (this.audioMeaningRef.current) {
      this.audioMeaningRef.current.play();
    }
  };

  playAudioExample = () => {
    if (this.audioExampleRef.current) {
      this.audioExampleRef.current.play();
    }
  };

  render() {
    const { word, restoreButton } = this.props;
    return (
      <Card bg="Light" className="wordCard my-4">
        <Card.Img variant="top" src={GIT_URL_WORD + word.image} />
        <Card.Body>
          <Card.Title>{word.word}</Card.Title>
          <Card.Text>{word.wordTranslate}</Card.Text>
          <Card.Text>
            {word.transcription}&nbsp;
            <img src={playImg} width="25" height="25" alt="play" onClick={this.playAudio} />
            <audio src={GIT_URL_WORD + word.audio} ref={this.audioRef} />
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            {word.textMeaning}&nbsp;
            <img src={playImg} width="25" height="25" alt="play" onClick={this.playAudioMeaning} />
            <audio src={GIT_URL_WORD + word.audioMeaning} ref={this.audioMeaningRef} />
          </ListGroupItem>
          <ListGroupItem>{word.textMeaningTranslate}</ListGroupItem>
          <ListGroupItem>
            {word.textExample}&nbsp;
            <img src={playImg} width="25" height="25" alt="play" onClick={this.playAudioExample} />
            <audio src={GIT_URL_WORD + word.audioExample} ref={this.audioExampleRef} />
          </ListGroupItem>
          <ListGroupItem>{word.textExampleTranslate}</ListGroupItem>
        </ListGroup>
        <Card.Footer>
          <div className={`dot-container-${word.difficulty}`}>
            {Array.from({ length: word.difficulty }, (item, index) => <span className="dot" key={index}></span>)}
          </div>
          <div>
            <span>Давность: {word.optionalUpdatedDateToNowDays}  дн. назад | </span>
            <span>Повторений: {word.optionalCounter} | </span>
            <span>Следующее: {word.optionalShowDate}  | </span>
          </div>
          < div className="mt-3">
            {
              (restoreButton === 'difficult' || restoreButton === 'delete')
                ? <Button variant="primary" onClick={this.restoreWord}>Восстановить</Button>
                : ''
            }
          </div>
        </Card.Footer>
      </Card >
    );
  }
}

Cardword.propTypes = propTypes;
export default Cardword;
