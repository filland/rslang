import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import FormControl from "react-bootstrap/FormControl";
import getUserWords from "../common/word/user-word/selectors";
import getDictionaryWords from "../common/word/dictionary-word/selectors";

import "./styles.scss";

const mediaStorage =
  "https://raw.githubusercontent.com/liplyanin/rslang-data/master/";

const defaultVolume = 0.2;

class LearningWords extends Component {
  state = {
    words: [],
    currentWord: "",
    input: "",
    inputBG: "white",
    difficulty: "",
    answer: "",
    numberOfWords: 0,
    wordsPerDay: 0,
  };

  componentDidUpdate() {
    if (!this.state.words.length) {
      let wordArr = [];
      for (let i = 0; i < 20; i++) {
        wordArr.push(this.props.dictionaryWords[i]);
      }
      this.setState({ words: wordArr, numberOfWords: wordArr.length });
    }
  }

  checkAnswer = (e) => {
    let check =
      e.target.value === this.state.words[0].word
        ? {
            inputBG: "lightgreen",
            answer: "correct",
          }
        : { inputBG: "salmon", answer: "wrong" };
    this.setState(check);
  };

  removeWordFromQueue = () => {
    this.setState({ words: this.state.words.slice(1) });
  };

  reinstallWordIntoQueue = () => {
    let wordArr = this.state.words;
    let currentWord = wordArr.shift();
    wordArr.push(currentWord);
    this.setState({ words: wordArr });
  };

  radioSelect = (e) => {
    this.setState({ difficulty: e.currentTarget.value });
  };

  NextWordBtnClick = () => {
    switch (this.state.difficulty) {
      case "0":
        this.reinstallWordIntoQueue();
        break;
      case "1":
        this.removeWordFromQueue();
        break;
      case "2":
        this.removeWordFromQueue();
        break;
      case "3":
        this.removeWordFromQueue();
        break;
      default:
        break;
    }
    this.setState({
      difficulty: "",
      input: "",
      inputBG: "white",
      answer: "",
    });
  };

  playSound = (path, volume = 0.2) => {
    let sound = new Audio(mediaStorage + path);
    sound.volume = volume;
    sound.play();
  };

  handleInput = (e) => {
    this.setState({ input: e.target.value, inputBG: "white" });
  };

  handleInputEnter = (e) => {
    if (e.key === "Enter") this.checkAnswer(e);
  };

  render() {
    let { words, difficulty, numberOfWords, answer } = this.state;
    let currentWord = words ? words[0] : null;

    return (
      <div className="learning-words-wrapper">
        <label className="learning-words-wrapper__progress">
          Lesson progress: <br />
          <ProgressBar
            now={numberOfWords - words.length}
            max={numberOfWords}
          />
        </label>
        {currentWord && (
          <div className="learning-words-wrapper__card">
            <div className="sentence d-flex align-items-center">
              {currentWord.textExample.substring(
                  0,
                  currentWord.textExample.indexOf("<b>")
                )}
              <FormControl
                autoFocus
                className="d-inline w-auto word-input"
                style={{ backgroundColor: this.state.inputBG }}
                aria-describedby="basic-addon1"
                value={this.state.input}
                onChange={(e) => this.handleInput(e)}
                onKeyPress={(e) => {
                  this.handleInputEnter(e);
                }}
                onBlur={(e) => this.checkAnswer(e)}
              />
              { currentWord.textExample.substring(
                currentWord.textExample.indexOf("</b>") + 4,
                currentWord.textExample.length
              )}
            </div>
            <div className="translate">
              <div>Слово: {currentWord.wordTranslate}</div>
            </div>
            {answer === "correct" && (
              <div>
                <div className="transcrption">
                  <div>Транскрипция: {currentWord.transcription}</div>
                </div>
                <div className="meaning">
                  <div>
                    Значение: {currentWord.textMeaningTranslate}
                    <Button
                      className="sound"
                      onClick={() =>
                        this.playSound(
                          currentWord.audioMeaning,
                          defaultVolume
                        )
                      }
                    >
                      Sound
                    </Button>
                  </div>
                </div>
                <div className="example">
                  <div>
                    Пример: {currentWord.textExampleTranslate}
                    <Button
                      className="sound"
                      onClick={() =>
                        this.playSound(currentWord.audioExample, defaultVolume)
                      }
                    >
                      Sound
                    </Button>
                  </div>
                </div>
                <div className="learning-words-wrapper__card__media">
                  <div className="media-wrapper">
                    <div className="picture">
                      <img src={mediaStorage + currentWord.image} alt="" />
                    </div>
                    <Button
                      className="sound"
                      onClick={() => this.playSound(currentWord.audio, defaultVolume)}
                    >
                      Sound
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="learning-words-wrapper__panel">
          <Button className="learning-words-wrapper__settings-btn">
            Settings
          </Button>
          <div className="learning-words-wrapper__difficulty">
            <label>
              <input
                type="radio"
                name="difficulty"
                value="0"
                checked={difficulty === "0"}
                onChange={(e) => this.radioSelect(e)}
              />
              Снова
            </label>
            <label>
              <input
                type="radio"
                name="difficulty"
                value="1"
                checked={difficulty === "1"}
                onChange={(e) => this.radioSelect(e)}
              />
              Сложно
            </label>
            <label>
              <input
                type="radio"
                name="difficulty"
                value="2"
                checked={difficulty === "2"}
                onChange={(e) => this.radioSelect(e)}
              />
              Нормально
            </label>
            <label>
              <input
                type="radio"
                name="difficulty"
                value="3"
                checked={difficulty === "3"}
                onChange={(e) => this.radioSelect(e)}
              />
              Легко
            </label>
          </div>
          <div className="learning-words-wrapper__controls">
            <Button
              className="learning-words-wrapper__controls-btn"
              disabled={
                difficulty === "" ||
                answer === "" ||
                answer === "wrong"
              }
              onClick={() => this.NextWordBtnClick()}
            >
              Следующее слово
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const getUserSettings = (store) => store.settings;

const mapStateToProps = (store) => ({
  dictionaryWords: getDictionaryWords(store),
  userWords: getUserWords(store),
  settings: getUserSettings(store),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LearningWords);
