import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Card, ListGroup, ListGroupItem,
} from "react-bootstrap";

const propTypes = {
  world: PropTypes.objectOf(PropTypes.any).isRequired,
};
// eslint-disable-next-line react/prefer-stateless-function
class CardWorld extends Component {
  render() {
    const { world } = this.props;
    return (
      <Card className="worldCard">
        <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
        <Card.Body>
          <Card.Title>{world.word}</Card.Title>
          <Card.Text>{world.wordTranslate}</Card.Text>
          <Card.Text>{world.transcription}</Card.Text>
          <audio>
            <source src="mySpeech.mp3" type="https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/files/01_0001.mp3" />
            <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
          </audio>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>To agree is to have the same opinion or belief as another person</ListGroupItem>
          <ListGroupItem>Согласиться - значит иметь то же мнение или убеждение, что и другой человек</ListGroupItem>
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

const mapStateToProps = (store) => ({

});

const mapDispatchToProps = {

};

CardWorld.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(CardWorld);
