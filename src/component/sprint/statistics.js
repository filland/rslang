import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { knowArr, mistakesArr } from './game';

function Statistics() {
  const mistakes = mistakesArr;
  const mistakesCount = mistakesArr.length;
  const listMistakesItems = mistakes.map((mistake, index) => <ListGroup.Item key={index}>
    {mistake}
  </ListGroup.Item>);
  const known = knowArr;
  const knownCount = knowArr.length;
  const listKnownItems = known.map((know, index) => <ListGroup.Item key={index}>
    {know}
  </ListGroup.Item>);
  return (
    <Container>
      <h2 className="text-center mb-2">Статистика Игры:</h2>
      <Row className="d-flex justify-content-center">
        <Card className="d-flex flex-column align-items-center mr-2">
          <Card.Body>
            <Card.Subtitle className="my-3">
              Ошибок
              <Badge variant="danger" className="ml-2">{ mistakesCount }</Badge>
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
              <Badge variant="info" className="ml-2">{ knownCount }</Badge>
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

export default Statistics;
