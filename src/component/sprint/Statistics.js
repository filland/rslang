import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

function Statistics() {
  return (
    <Container id=" statistics-wrapper">
      <Card className="d-flex flex-column align-items-center p-5" id="statistics">
        <Card.Body>
          <Card.Title>Статистика Игры:</Card.Title>
          <Card.Subtitle className="my-3">
            Ошибок
            <Badge variant="danger" className="ml-2">10</Badge>
          </Card.Subtitle>
          <ListGroup className="card-text">
            <ListGroup.Item>Amount - количество</ListGroup.Item>
            <ListGroup.Item>Deserve - заслуживать</ListGroup.Item>
            <ListGroup.Item>Lean - наклонять</ListGroup.Item>
          </ListGroup>
          <Card.Subtitle className="my-3">
            Знаю
            <Badge variant="info" className="ml-2">10</Badge>
          </Card.Subtitle>
          <ListGroup className="card-text">
            <ListGroup.Item>Amount - количество</ListGroup.Item>
            <ListGroup.Item>Deserve - заслуживать</ListGroup.Item>
            <ListGroup.Item>Lean - наклонять</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Statistics;
