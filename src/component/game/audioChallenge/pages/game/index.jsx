import React from "react";
import PropTypes from "prop-types";
import { ButtonGroup, Button, ProgressBar } from "react-bootstrap";
import { RightWord } from "../../components/RightWord";
import { MENU_PAGE } from "../../constants";
import "./styles.css";

const nowProgress = 20;
const words = [
  { word: "word1", id: 1 },
  { word: "word2", id: 2 },
  { word: "word3", id: 3 },
  { word: "word4", id: 4 },
  { word: "word5", id: 5 },
];
const rightWord = { word: "word1", image: "https://sinkvein.ru/wp-content/uploads/2018/10/%D1%81%D0%BB%D0%BE%D0%B2%D0%BE-300x170.png" };

function Game({ setCurrentPage }) {
  return (
    <div className="audioChallenge">
      <ProgressBar className="progressBar" variant="info" now={nowProgress} label={`${nowProgress}%`} srOnly />
      <RightWord word={rightWord.word} imgURL={rightWord.image} />
      <Button className="btn-close" variant="outline-danger" onClick={() => setCurrentPage(MENU_PAGE)}>Close</Button>
      <ButtonGroup aria-label="List words">
        {words.map(({ word, id }) => <Button key={id}>{word}</Button>)}
      </ButtonGroup>
      <Button variant="outline-primary">Не знаю</Button>
    </div>
  );
}

Game.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default Game;
