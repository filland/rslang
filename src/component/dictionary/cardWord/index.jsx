/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import {
  Card, ListGroup, ListGroupItem, Col,
} from 'react-bootstrap';
import fetchUserWords, { updateOldUserWords } from '../../common/word/user-word/service';
import { GIT_URL_WORD } from '../constants';

import playImg from '../assets/images/audioPlayWord.png';
import './styles.scss';
import {
  formatDateInWord, getDiffUpdatedDateToNowDays, nameDifficulty, getVolume,
} from '../utils';

const propTypes = {
  word: PropTypes.objectOf(PropTypes.any).isRequired,
  settings: PropTypes.objectOf(PropTypes.any).isRequired,
  restoreButton: PropTypes.string.isRequired,
  updateOldUserWords: PropTypes.func,
  fetchUserWords: PropTypes.func,
};

class Cardword extends Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.audioMeaningRef = React.createRef();
    this.audioExampleRef = React.createRef();
  }

  restoreWord = async () => {
    const {
      updateOldUserWords, fetchUserWords, word, restoreButton,
    } = this.props;
    word.userWord.optional.deleted = false;

    if (!word.userWord.optional.counter) word.userWord.optional.counter = '0';
    if (restoreButton === 'difficult') {
      word.userWord.difficulty = 'normal';
    }
    await updateOldUserWords([word]);
    await fetchUserWords();
  };

  playAudio = () => {
    if (this.audioRef.current) {
      this.audioRef.current.volume = this.formVolume();
      this.audioRef.current.play();
    }
  };

  playAudioMeaning = () => {
    if (this.audioMeaningRef.current) {
      this.audioMeaningRef.current.volume = this.formVolume();
      this.audioMeaningRef.current.play();
    }
  };

  playAudioExample = () => {
    if (this.audioExampleRef.current) {
      this.audioExampleRef.current.volume = this.formVolume();
      this.audioExampleRef.current.play();
    }
  };

  formDifficulty = () => nameDifficulty(this.props.word.userWord.difficulty);

  formVolume = () => getVolume(this.props.settings.optional.volumeValue);

  render() {
    const { word, restoreButton, settings } = this.props;
    const difficulty = this.formDifficulty();

    console.log(word);
    return (
      <Col xs={12} sm={6} md={4} >
        <Card bg="Light" className="wordCard my-4 text-center">
          {settings.optional.informationPicture
            && <Card.Img variant="top" src={`${GIT_URL_WORD}${word.image}`} className="mx-auto" />
          }
          <Card.Body>
            <Card.Title>{word.word}</Card.Title>
            {
              settings.optional.informationTranslate
              && <Card.Text>{word.wordTranslate}</Card.Text>
            }
            {
              settings.optional.informationTranscription
              && <Card.Text>
                {word.transcription}&nbsp;
                <img src={playImg} width="25" height="25" alt="play" onClick={this.playAudio} />
                <audio src={`${GIT_URL_WORD}${word.audio}`} ref={this.audioRef} />
              </Card.Text>
            }
          </Card.Body>
          <ListGroup className="list-group-flush">
            {settings.optional.informationDescription
              && <ListGroupItem>
                {word.textMeaning.replace(/<\/?[^>]+(>|$)/g, '')}&nbsp;
            <img src={playImg} width="25" height="25" alt="play" onClick={this.playAudioMeaning} />
                <audio src={`${GIT_URL_WORD}${word.audioMeaning}`} ref={this.audioMeaningRef} />
              </ListGroupItem>
            }

            {settings.optional.informationDescription
              && <ListGroupItem>{word.textMeaningTranslate}</ListGroupItem>
            }

            {settings.optional.informationExample
              && <ListGroupItem>
                {word.textExample.replace(/<\/?[^>]+(>|$)/g, '')}&nbsp;
              <img src={playImg} width="25" height="25" alt="play" onClick={this.playAudioExample} />
                <audio src={`${GIT_URL_WORD}${word.audioExample}`} ref={this.audioExampleRef} />
              </ListGroupItem>
            }
            <ListGroupItem>{word.textExampleTranslate}</ListGroupItem>
          </ListGroup>
          <Card.Footer>
            <div className={`dot-container-${word.userWord.difficulty}`}>
              {Array.from({ length: difficulty }, (item, index) => <span className="dot" key={index}></span>)}
            </div>
            <div>
              <span>Давность: {getDiffUpdatedDateToNowDays(word.userWord)}  дн. назад | </span>
              <span>Повторений: {word.userWord.optional.counter ? word.userWord.optional.counter : 0} | </span>
              <span>Следующее: {formatDateInWord(word.userWord)} </span>
            </div>
            < div className="mt-3">
              {(restoreButton === 'difficult' || restoreButton === 'delete')
                && <Button variant="primary" onClick={this.restoreWord}>Восстановить</Button>
              }
            </div>
          </Card.Footer>
        </Card >
      </Col >
    );
  }
}

Cardword.propTypes = propTypes;

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
  updateOldUserWords, fetchUserWords,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cardword);
