import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './sprint.scss';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { setUserDifficulty } from '../settings/service';
import Game from './game';

class Sprint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameRender: false,
    };
  }

  handleClick = (levelValue) => {
    const { setUserDifficulty } = this.props;
    setUserDifficulty(levelValue + 1);
    this.setState({ gameRender: true });
  }

  render() {
    const difficulties = ['Очень Легкая', 'Легкая', 'Интересная', 'Очень Интересная', 'Сложная', 'Let me speak from my hard advanced'];
    const colors = ['btn-primary mb-2', 'btn-danger mb-2', 'btn-success mb-2', 'btn-warning mb-2', 'btn-info mb-2', 'btn-secondary mb-2'];
    const listDifficulties = difficulties.map((difficulty, index) => <Button key={index} className={colors[index]} onClick={() => this.handleClick(index)}>
    {difficulty}
    </Button>);
    const { gameRender } = this.state;
    if (gameRender) {
      return <Game />;
    }
    return (
      <Container id="outer">
        <Card className="d-flex flex-column align-items-center p-5 inner" id="inner">
          <Card.Body className="d-flex flex-column align-items-center p-4">
            <Card.Title className="mb-4">Выберите уровень сложности игры:</Card.Title>
            <Row className="d-flex flex-column justify-content-center">
              {listDifficulties}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
  setUserDifficulty,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sprint);
