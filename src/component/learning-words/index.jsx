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
      this.setState({ words: wordArr });
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

  render() {
    console.log(this.state);
    console.log(this.props);

    return (
      <div className="learning-words-wrapper">
        <label className="learning-words-wrapper__progress">
          Lesson progress: <br />
          <ProgressBar
            now={this.state.numberOfWords - this.state.words.length}
            max={this.state.numberOfWords}
          />
        </label>
        {this.state.words[0] && (
          <div className="learning-words-wrapper__card">
            <div className="sentence d-flex align-items-center">
              {this.state.words[0].textExample.substring(
                0,
                this.state.words[0].textExample.indexOf("<b>")
              )}
              <FormControl
                autoFocus
                className="d-inline w-auto word-input"
                style={{ backgroundColor: this.state.inputBG }}
                aria-describedby="basic-addon1"
                value={this.state.input}
                onChange={(e) =>
                  this.setState({ input: e.target.value, inputBG: "white" })
                }
                onKeyPress={(e) => {
                  if (e.key === "Enter") this.checkAnswer(e);
                }}
                onBlur={(e) => this.checkAnswer(e)}
              />
              {this.state.words[0].textExample.substring(
                this.state.words[0].textExample.indexOf("</b>") + 4,
                this.state.words[0].textExample.length
              )}
            </div>
            <div className="translate">
              <div>Слово: {this.state.words[0].wordTranslate}</div>
            </div>
            {this.state.answer === "correct" && (
              <div>
                <div className="transcrption">
                  <div>Транскрипция: {this.state.words[0].transcription}</div>
                </div>
                <div className="meaning">
                  <div>
                    Значение: {this.state.words[0].textMeaningTranslate}
                    <Button
                      className="sound"
                      onClick={() => {
                        let sound = new Audio(
                          mediaStorage + this.state.words[0].audioMeaning
                        );
                        sound.volume = 0.2;
                        sound.play();
                      }}
                    >
                      Sound
                    </Button>
                  </div>
                </div>
                <div className="example">
                  <div>
                    Пример: {this.state.words[0].textExampleTranslate}
                    <Button
                      className="sound"
                      onClick={() => {
                        let sound = new Audio(
                          mediaStorage + this.state.words[0].audioExample
                        );
                        sound.volume = 0.2;
                        sound.play();
                      }}
                    >
                      Sound
                    </Button>
                  </div>
                </div>
                <div className="learning-words-wrapper__card__media">
                  <div className="media-wrapper">
                    <div className="picture">
                      <img
                        src={mediaStorage + this.state.words[0].image}
                        alt=""
                      />
                    </div>
                    <Button
                      className="sound"
                      onClick={() => {
                        let sound = new Audio(
                          mediaStorage + this.state.words[0].audio
                        );
                        sound.volume = 0.2;
                        sound.play();
                      }}
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
                checked={this.state.difficulty === "0"}
                onChange={(e) => this.radioSelect(e)}
              />{" "}
              Снова
            </label>
            <label>
              <input
                type="radio"
                name="difficulty"
                value="1"
                checked={this.state.difficulty === "1"}
                onChange={(e) => this.radioSelect(e)}
              />{" "}
              Сложно
            </label>
            <label>
              <input
                type="radio"
                name="difficulty"
                value="2"
                checked={this.state.difficulty === "2"}
                onChange={(e) => this.radioSelect(e)}
              />{" "}
              Нормально
            </label>
            <label>
              <input
                type="radio"
                name="difficulty"
                value="3"
                checked={this.state.difficulty === "3"}
                onChange={(e) => this.radioSelect(e)}
              />{" "}
              Легко
            </label>
          </div>
          <div className="learning-words-wrapper__controls">
            <Button
              className="learning-words-wrapper__controls-btn"
              disabled={
                this.state.difficulty === "" ||
                this.state.answer === "" ||
                this.state.answer === "wrong"
              }
              onClick={() => {
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
              }}
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
