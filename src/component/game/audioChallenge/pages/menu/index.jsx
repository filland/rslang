import React from 'react';
import { Button } from 'react-bootstrap';
import { GAME_PAGE } from '../../constants';
import './styles.scss';

export default function Menu({ setCurrentPage }) {
  return (
    <div className="audioChallenge__menu">
      <div className="game-card">
        <div className="description">
          <h1>Аудиовызов</h1>
          <h2>Цель - выбрать перевод слова по звучащему произношению.</h2>
          <p>
            <ul>
              <li>В процессе игры звучит произношение слова на английском языке, нужно выбрать перевод слова из пяти предложенных вариантов ответа.</li>
              <li>Слова можно угадывать, выбирая их как кликами мышкой, так и нажатием кнопок клавиатуры.</li>
            </ul>
          </p>
        </div>
        <div className="game-setup">
          <Button onClick={() => setCurrentPage(GAME_PAGE)}>Start</Button>
        </div>
      </div>
    </div>
  );
}
