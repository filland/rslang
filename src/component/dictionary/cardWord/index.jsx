import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import {
  Card, ListGroup, ListGroupItem,
} from 'react-bootstrap';
import fetchWordServiceRestore from '../serviceRestore';

import playImg from '../assets/images/audioPlayWord.png';
import './styles.scss';
import { formatDateInWord, getDiffUpdatedDateToNowDays } from '../utils';

const propTypes = {
  word: PropTypes.objectOf(PropTypes.any).isRequired,
  restoreButton: PropTypes.string.isRequired,
  handlerRestore: PropTypes.func,
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
    this.props.handlerRestore();
    fetchWordServiceRestore(this.props.word.wordId, this.props.restoreButton);
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
    console.log(word);

    return (
      <Card bg="Light" className="wordCard my-4 text-center">
        <Card.Img variant="top" src={`data:image/jpg;base64,${word.dictionaryWord.image}`} className="mx-auto" />
        <Card.Body>
          <Card.Title>{word.dictionaryWord.word}</Card.Title>
          <Card.Text>{word.dictionaryWord.wordTranslate}</Card.Text>
          <Card.Text>
            {word.dictionaryWord.transcription}&nbsp;
            <img src={playImg} width="25" height="25" alt="play" onClick={this.playAudio} />
            <audio src={`data:audio/mpeg;base64,${word.dictionaryWord.audio}`} ref={this.audioRef} />
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            {word.dictionaryWord.textMeaning}&nbsp;
            <img src={playImg} width="25" height="25" alt="play" onClick={this.playAudioMeaning} />
            <audio src={`data:audio/mpeg;base64,${word.dictionaryWord.audioMeaning}`} ref={this.audioMeaningRef} />
          </ListGroupItem>
          <ListGroupItem>{word.dictionaryWord.textMeaningTranslate}</ListGroupItem>
          <ListGroupItem>
            {word.dictionaryWord.textExample}&nbsp;
            <img src={playImg} width="25" height="25" alt="play" onClick={this.playAudioExample} />
            <audio src={`data:audio/mpeg;base64,${word.dictionaryWord.audioExample}`} ref={this.audioExampleRef} />
          </ListGroupItem>
          <ListGroupItem>{word.dictionaryWord.textExampleTranslate}</ListGroupItem>
        </ListGroup>
        <Card.Footer>
          <div className={`dot-container-${word.difficulty}`}>
            {Array.from({ length: word.difficulty }, (item, index) => <span className="dot" key={index}></span>)}
          </div>
          <div>
            <span>Давность: {getDiffUpdatedDateToNowDays(word.dictionaryWord)}  дн. назад | </span>
            <span>Повторений: {word.optional.counter} | </span>
            <span>Следующее: {formatDateInWord(word.dictionaryWord)} </span>
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
