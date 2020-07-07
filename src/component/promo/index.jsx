/* eslint-disable max-len */
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

import './styles.scss';

const Promo = () => (
  <div className="game">
    <div className="game-card">
      <div className="meta">
        <div className="photo"></div>
        <div className="details">
          <Nav.Link as={Link} to="/game/speakit" className="photo-link">Play</Nav.Link>
        </div>
      </div>
      <div className="description">
        <h1>SpeakIt</h1>
        <h2>Приложение для проверки произношения</h2>
        <p>
          <ul>
            <li>Слова выводятся на страницу группами по 10 слов. Возле каждого слова отображается транскрипция и иконка аудио</li>
            <li>При клике по слову звучит его произношение, выводятся соответствующие данному слову картинка и перевод</li>
            <li>У пользователя есть возможность включить (и отключить) распознавание речи Google Speech Recognition</li>
            <li>Если распознавание речи включено, и приложению разрешён доступ к микрофону, все произнесённые пользователем слова распознаются и отображаются в текстовом виде</li>
            <li>Проверка правильности произношения происходит путём сравнения распознанного текста с написанием слова</li>
            <li>Приложение сохраняет результаты тренировки произношения каждой группы слов и позволяет их просматривать</li>
          </ul>
        </p>
        <p className="read-more">
          <a href="https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rslang/speakit.md">Информация</a>
        </p>
      </div>
    </div>

  </div>
);

export default Promo;
