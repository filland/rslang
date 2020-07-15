import React from 'react';
import { Card, Row, Button } from 'react-bootstrap';
import { GAME_PAGE } from '../../constants';
import { setUserDifficulty } from '../../../../settings/service';
import './styles.scss';

export default function Menu({ setCurrentPage }) {
  const handleClick = (e, levelValue) => {
    setUserDifficulty(levelValue + 1);
    const btn = e.target;
    const group = [...btn.parentElement.children];
    const checkActive = group.findIndex((button) => button.classList.contains('btn-dif__active'));
    if (checkActive !== -1) {
      const activeBtn = btn.parentElement.children[checkActive];
      activeBtn.classList.remove('btn-dif__active');
    }
    btn.classList.add('btn-dif__active');
  };

  const difficulties = ['Очень Легкая', 'Легкая', 'Интересная', 'Очень Интересная', 'Сложная', 'Очень сложная'];
  const colors = ['btn-dif-1', 'btn-dif-2', 'btn-dif-3', 'btn-dif-4', 'btn-dif-5', 'btn-dif-6'];
  const listDifficulties = difficulties.map((difficulty, index) => (
    <Button key={index} className={colors[index]} onClick={(e) => handleClick(e, index)}>
      {difficulty}
    </Button>
  ));

  return (
    <div className="audioChallenge__menu">
      <div className="game-card">
        <div className="description">
          <h1>Аудиовызов</h1>
          <h2>Цель - выбрать перевод слова по звучащему произношению.</h2>
          <p>
            <ul>
              <li>В процессе игры звучит произношение слова на английском языке, нужно выбрать перевод слова из пяти предложенных вариантов ответа.</li>
              <li>Слова можно угадывать, выбирая их как кликами мышкой, так и нажатием кнопок клавиатуры от 1 до 5.</li>
              <li>Переход к следующему вопросу происходит как при клике по стрелке, так и нажатием клавиши Enter </li>
            </ul>
          </p>
        </div>
        <div className="game-setup">
          <Card className="d-flex flex-column align-items-center inner">
            <Card.Body className="d-flex flex-column align-items-center p-4">
              <Card.Title className="mb-4 text-center">Выберите уровень сложности игры:</Card.Title>
              <Row className="d-flex flex-column justify-content-center">
                {listDifficulties}
              </Row>
              <Button className="mt-5" onClick={() => setCurrentPage(GAME_PAGE)}>Start</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
