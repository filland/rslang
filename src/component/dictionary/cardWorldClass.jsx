import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card, ListGroup, ListGroupItem,
} from 'react-bootstrap';
import './styles.css';

import playImg from './assets/images/audioPlayWord.png';

const propTypes = {
  world: PropTypes.objectOf(PropTypes.any).isRequired,
  audioRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};
const gitUrlWorld = 'https://raw.githubusercontent.com/agnusha/rslang-data/master/';

class CardWorld extends Component {
  render() {
    const { world, audioRef } = this.props;
    return (
      <Card bg="Light" className="worldCard">
        <Card.Img variant="top" src={gitUrlWorld + world.image} />
        <Card.Body>
          <Card.Title>{world.word}</Card.Title>
          <Card.Text>{world.wordTranslate}</Card.Text>
          <Card.Text>{world.transcription}</Card.Text>
          <audio controls><source src={gitUrlWorld + world.audio} /></audio>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>{world.textMeaning}</ListGroupItem>
          <ListGroupItem>{world.textMeaningTranslate}</ListGroupItem>
          <audio controls><source src={gitUrlWorld + world.audioMeaning} /></audio>

          <div className="play-word">
            <img src={playImg} width="25" height="25" alt="play" onClick={this.handleGameTools(audioRef)} />
          </div>
          <audio controls src={gitUrlWorld + world.audioMeaning} ref={audioRef} />

          <ListGroupItem>{world.textExample}</ListGroupItem>
          <ListGroupItem>{world.textExampleTranslate}</ListGroupItem>
          <audio controls><source src={gitUrlWorld + world.audioExample} /></audio>

        </ListGroup>
        <Card.Footer>
          {/* todo: add info from back */}
          {/* todo: add img to difficulty */}
          <div>{world.difficulty}</div>
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
    console.log(this.props.audioRef.current);
    // console.log(target);
    // return this.props.audioRef.current.play();
    // return this.props.audioRef.current.play();
    // return target.current.play();
    // console.log(typeof (this.audioRef.current.play()));
    // return this.audioRef.current.play();
  };
}

CardWorld.propTypes = propTypes;
export default CardWorld;
