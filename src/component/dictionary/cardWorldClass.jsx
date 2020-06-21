import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card, ListGroup, ListGroupItem,
} from 'react-bootstrap';
import './styles.css';

const propTypes = {
  world: PropTypes.objectOf(PropTypes.any).isRequired,
};
const gitUrlWorld = 'https://raw.githubusercontent.com/agnusha/rslang-data/master/';

class CardWorld extends Component {
  render() {
    const { world } = this.props;
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
}

CardWorld.propTypes = propTypes;
export default CardWorld;
