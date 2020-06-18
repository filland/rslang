import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Tabs, Tab, Card, ListGroup, ListGroupItem,
} from "react-bootstrap";
import Loader from "../common/loader";

import { fetchWorldService } from "./service";
import "./styles.css";
import {
  getUserIdSelector,
  getLosingFlagSelector,
  getWordsSelector,
  getUserTokenSelector,
} from "./selectors";

const propTypes = {
  fetchWorld: PropTypes.func.isRequired,
  user: PropTypes.bool.isRequired,
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

// eslint-disable-next-line react/prefer-stateless-function
class Dictionary extends Component {
  componentDidMount() {
    const { fetchWorld } = this.props;
    fetchWorld();
  }

  render() {
    console.log(this.props);
    const { user, words, isLoading } = this.props;
    console.log("слова  jsx");
    console.log(words);
    console.log(user);

    if (isLoading) {
      return (<Loader />);
    }

    return (
      <Tabs defaultActiveKey="learn" id="dictionary-tab-mode">
        <Tab eventKey="learn" title="Изучаемые слова">
          Число слов: 0 (0 сегодня)
          <Card className="worldCard">
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
              <Card.Title>agree</Card.Title>
              <Card.Text>согласна</Card.Text>
              <Card.Text>[əgríː]</Card.Text>
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
        </Tab>
        <Tab eventKey="difficult" title="Сложные слова" disabled>
          tab-2
        </Tab>
        <Tab eventKey="deleted" title="Удалённые слова" disabled>
          tab-3
        </Tab>
      </Tabs>
    );
  }
}

const mapStateToProps = (store) => ({
  words: getWordsSelector(store),
  isLoading: getLosingFlagSelector(store),
  user: getUserIdSelector(store),
});

const mapDispatchToProps = {
  fetchWorld: fetchWorldService,
};

Dictionary.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);
