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
        </div>
      </div>
      <div className="description">
        <h1>SpeakIt</h1>
        <h2>Приложение для проверки произношения</h2>
        <p>
          <ul>
            <li>Слова выводятся на страницу группами по 10 слов. Возле каждого слова отображается транскрипция и иконка аудио.</li>
            <li>При клике по слову звучит его произношение, выводятся картинка и перевод.</li>
            <li>Произнесённые пользователем слова распознаются и отображаются в текстовом виде. Проверка правильности произношения происходит путём сравнения распознанного текста с написанием слова.</li>
            <li>Приложение позволяет их просматривать результаты тренировки каждой группы слов.</li>
          </ul>
        </p>
        <p className="read-more">
          <Nav.Link as={Link} to="/game/speakit" className="game-link">Play</Nav.Link>
        </p>
      </div>
    </div>

    <div className="game-card alt">
      <div className="meta">
        <div className="photo"></div>
        <div className="details">
        </div>
      </div>
      <div className="description">
        <h1>English puzzle</h1>
        <h2>Цель - собрать предложения из слов в случайном порядке</h2>
        <p>
          <ul>
            <li>В случайном порядке размещаются карточки со словами, из которых можно собрать предложение.</li>
            <li>В игре 6 уровней сложности по количеству частей коллекции исходных данных, в каждом уровне 60 раундов по 10 предложений в каждом.</li>
            <li>На странице статистики отображаются все предложения раунда.</li>
          </ul>
        </p>
        <p className="read-more">
          <Nav.Link as={Link} to="/english-puzzle" className="game-link">Play</Nav.Link>
        </p>
      </div>
    </div>

    <div className="game-card">
      <div className="meta">
        <div className="photo"></div>
        <div className="details">
        </div>
      </div>
      <div className="description">
        <h1>Саванна</h1>
        <h2>Тренировка развивает словарный запас</h2>
        <p>
          <ul>
            <li>Чем больше слов ты знаешь, тем больше очков опыта получишь.</li>
            <li>На экране пользователю показывается загадываемое слово и 4 варианта перевода.</li>
            <li>Пользователь должен выбрать правильный по его мнению вариант перевода при помощи мыши или клавиш 1-4.</li>
          </ul>
        </p>
        <p className="read-more">
          <Nav.Link as={Link} to="/savanna" className="game-link">Play</Nav.Link>
        </p>
      </div>
    </div>

    <div className="game-card alt">
      <div className="meta">
        <div className="photo"></div>
        <div className="details">
        </div>
      </div>
      <div className="description">
        <h1>Аудиовызов</h1>
        <h2>Цель - выбрать перевод слова по звучащему произношению.</h2>
        <p>
          <ul>
            <li>В процессе игры звучит произношение слова на английском языке, нужно выбрать перевод слова из пяти предложенных вариантов ответа.</li>
            <li>Слова можно угадывать, выбирая их как кликами мышкой, так и нажатием кнопок клавиатуры.</li>
            <li>Переводы слов, из которых выбирается нужный, относятся к одной части речи и имеют схожее написание.</li>
          </ul>
        </p>
        <p className="read-more">
          <Nav.Link as={Link} to="/audioChallenge" className="game-link">Play</Nav.Link>
        </p>
      </div>
    </div>

    <div className="game-card">
      <div className="meta">
        <div className="photo"></div>
        <div className="details">
        </div>
      </div>
      <div className="description">
        <h1>Спринт</h1>
        <h2>Тренировка скорости и правильности перевода</h2>
        <p>
          <ul>
            <li>Ход игры: пользователь видит слово на английском языке и перевод слова, нужно указать принадлежит ли данный перевод этому слову.</li>
            <li>Продолжительность раунда - 1 минута.</li>
            <li>Слова можно угадывать выбирая их как кликами мышкой, так и нажатием стрелок на клавиатуре.</li>
          </ul>
        </p>
        <p className="read-more">
          <Nav.Link as={Link} to="/english-puzzle" className="photo-link">Play</Nav.Link>
        </p>
      </div>
    </div>

    <div className="game-card alt">
      <div className="meta">
        <div className="photo"></div>
        <div className="details">
        </div>
      </div>
      <div className="description">
        <h1>Своя игра</h1>
        <h2>Не реализовано</h2>
        <p>
          <ul>
            <li>Планируется разработка.</li>
          </ul>
        </p>
        <p className="read-more">
        </p>
      </div>
    </div>

  </div>
);

export default Promo;
