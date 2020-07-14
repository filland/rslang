import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Btn from '../../../../common/Btn';
import { MENU_PAGE } from '../../constants';
import {
  getKnowArray,
  getMistakesArray,
} from './selectors';
import './styles.scss';

class Statistics extends Component {
  render() {
    const { knowArray, mistakesArray } = this.props;
    const { setCurrentPage } = this.props;
    const mistakes = mistakesArray;
    const mistakesCount = mistakesArray.length;
    const listMistakesItems = mistakes.map((mistake, index) => <ListGroup.Item key={index}>
      {mistake}
    </ListGroup.Item>);
    const known = knowArray;
    const knownCount = knowArray.length;
    const listKnownItems = known.map((know, index) => <ListGroup.Item key={index}>
      {know}
    </ListGroup.Item>);
    return (
      <Container className="audioChallenge__statistics">
        <Btn className="btn-close" variant="outline-danger" onClick={() => setCurrentPage(MENU_PAGE)}>Close</Btn>
        <h2 className="text-center mb-2">Статистика Игры:</h2>
        <Row className="d-flex justify-content-center">
          <Card className="d-flex flex-column align-items-center mr-2">
            <Card.Body>
              <Card.Subtitle className="my-3">
                Ошибок
              <Badge variant="danger" className="ml-2">{mistakesCount}</Badge>
              </Card.Subtitle>
              <ListGroup className="card-text">
                {listMistakesItems}
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="d-flex flex-column align-items-center ml-2">
            <Card.Body>
              <Card.Subtitle className="my-3">
                Знаю
              <Badge variant="info" className="ml-2">{knownCount}</Badge>
              </Card.Subtitle>
              <ListGroup className="card-text">
                {listKnownItems}
              </ListGroup>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (store) => ({
  knowArray: getKnowArray(store),
  mistakesArray: getMistakesArray(store),
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
