import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card, ListGroup, ListGroupItem,
} from 'react-bootstrap';

const propTypes = {
  world: PropTypes.objectOf(PropTypes.any).isRequired,
};
// eslint-disable-next-line react/prefer-stateless-function
class CardWorld extends Component {
  render() {
    const { world } = this.props;
    return (
      <Card bg="Light" className="worldCard">
        <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
        <Card.Body>
          <Card.Title>{world.word}</Card.Title>
          <Card.Text>{world.wordTranslate}</Card.Text>
          <Card.Text>{world.transcription}</Card.Text>
          <audio>
            <source src="mySpeech.mp3" type="" />
            <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
          </audio>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>{world.textMeaning}</ListGroupItem>
          <ListGroupItem>{world.textMeaningTranslate}</ListGroupItem>
          {/* todo: add audio */}
          <ListGroupItem>The students agree they have too much homework</ListGroupItem>
          <ListGroupItem>Студенты согласны, что у них слишком много домашней работы</ListGroupItem>
          {/* todo: add audio */}
        </ListGroup>
        <Card.Footer>
          <div>Process</div>
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

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

CardWorld.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(CardWorld);
