/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Card, ListGroup, ListGroupItem, Col,
} from 'react-bootstrap';
import Btn from '../../common/Btn';
import fetchWordServiceRestore from '../serviceRestore';
import { updateOldUserWords } from '../../common/word/user-word/service';
import playImg from '../assets/images/audioPlayWord.png';
import './styles.scss';
import { formatDateInWord, getDiffUpdatedDateToNowDays } from '../utils';

const propTypes = {
  word: PropTypes.objectOf(PropTypes.any).isRequired,
  settings: PropTypes.objectOf(PropTypes.any).isRequired,
  restoreButton: PropTypes.string.isRequired,
  handlerRestore: PropTypes.func,
  updateOldUserWords: PropTypes.func,
};

class Cardword extends Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.audioMeaningRef = React.createRef();
    this.audioExampleRef = React.createRef();
  }

  restoreWord = () => {
    const { updateOldUserWords, word, restoreButton } = this.props;

    fetchWordServiceRestore(word.id, restoreButton);
    updateOldUserWords([word.userWord]);
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

  formDifficulty = () => {
    const difficultyString = this.props.word.userWord.difficulty;
    let dotCount;
    switch (difficultyString) {
      case 'hard':
        dotCount = 3;
        break;
      case 'normal':
        dotCount = 2;
        break;
      case 'easy':
        dotCount = 1;
        break;
      default:
        dotCount = 0;
    }
    return dotCount;
  };

  render() {
    const { word, restoreButton, settings } = this.props;
    const difficulty = this.formDifficulty();

    return (
      <Col xs={12} sm={6} md={4} >
        <Card bg="Light" className="wordCard my-4 text-center">
          {settings.optional.informationPicture
            && <Card.Img variant="top" src={`data:image/jpg;base64,${word.image}`} className="mx-auto" />
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
                <audio src={`data:audio/mpeg;base64,${word.audio}`} ref={this.audioRef} />
              </Card.Text>
            }
          </Card.Body>
          <ListGroup className="list-group-flush">
            {settings.optional.informationDescription
              && <ListGroupItem>
                {word.textMeaning}&nbsp;
            <img src={playImg} width="25" height="25" alt="play" onClick={this.playAudioMeaning} />
                <audio src={`data:audio/mpeg;base64,${word.audioMeaning}`} ref={this.audioMeaningRef} />
              </ListGroupItem>
              && <ListGroupItem>{word.textMeaningTranslate}</ListGroupItem>
            }

            {settings.optional.informationExample
              && <ListGroupItem>
                {word.textExample}&nbsp;
              <img src={playImg} width="25" height="25" alt="play" onClick={this.playAudioExample} />
                <audio src={`data:audio/mpeg;base64,${word.audioExample}`} ref={this.audioExampleRef} />
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
                && <Btn variant="primary" onClick={this.restoreWord}>Восстановить</Btn>
              }
            </div>
          </Card.Footer>
        </Card >
      </Col>
    );
  }
}

Cardword.propTypes = propTypes;

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
  updateOldUserWords,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cardword);
