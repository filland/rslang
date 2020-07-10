import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import FormControl from "react-bootstrap/FormControl";
import getUserWords from "../common/word/user-word/selectors";
import getDictionaryWords from "../common/word/dictionary-word/selectors";
import { prepareWords } from "../../common/helper/WordsHelper";
import {
  convertDictionaryToUserWord,
  setWordDeleted,
} from "../../common/helper/WordUtils";
import { setWordDifficulty } from "../../common/helper/WordUtils";

import "./styles.scss";

const mediaStorage =
  "https://raw.githubusercontent.com/liplyanin/rslang-data/master/";

const defaultVolume = 0.2;

class LearningWords extends Component {
  state = {
    words: [],
    learnedWords: [],
    currentWord: "",
    input: "",
    inputBG: "white",
    difficulty: "",
    answer: "",
    numberOfWords: 0,
    wordsPerDay: 0,
  };

  componentDidMount() {
    if (!this.state.words.length && this.props.dictionaryWords.length) {
      let wordArr = [];
      for (let i = 0; i < 20; i++) {
        wordArr.push(this.props.dictionaryWords[i]);
      }
      this.setState({ words: wordArr, numberOfWords: wordArr.length });
    }
  }

  componentDidUpdate() {
    if (!this.state.words.length && this.props.dictionaryWords.length) {
      let wordArr = [];
      for (let i = 0; i < 20; i++) {
        wordArr.push(this.props.dictionaryWords[i]);
      }
      this.setState({ words: wordArr, numberOfWords: wordArr.length });
    }
  }

  checkAnswer = ({ target }) => {
    const isSuccess = target.value === this.state.words[0].word;

    this.setState({
      inputBG: isSuccess ? "lightgreen" : "salmon",
      answer: isSuccess ? "correct" : "wrong",
    });
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

  NextWordBtnClick = (word) => {
    switch (this.state.difficulty) {
      case "0":
        this.reinstallWordIntoQueue();
        break;
      case "1": {
        this.setState({
          learnedWords: this.state.learnedWords.concat(
            setWordDifficulty(word, "hard")
          ),
        });
        this.removeWordFromQueue();
        break;
      }
      case "2": {
        this.setState({
          learnedWords: this.state.learnedWords.concat(
            setWordDifficulty(word, "normal")
          ),
        });
        this.removeWordFromQueue();
        break;
      }
      case "3": {
        this.setState({
          learnedWords: this.state.learnedWords.concat(
            setWordDifficulty(word, "easy")
          ),
        });
        this.removeWordFromQueue();
        break;
      }
      case "4": {
        this.setState({
          learnedWords: this.state.learnedWords.concat(setWordDeleted(word)),
        });
        this.removeWordFromQueue();
        break;
      }
      default: {
        this.removeWordFromQueue();
        break;
      }
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
    let {
      words,
      difficulty,
      numberOfWords,
      answer,
      input,
      inputBG,
    } = this.state;

    let {
      levelButtons,
      informationDescription,
      informationPicture,
      informationTranscription,
      informationExample,
    } = this.props.settings.optional;

    let currentWord = words ? words[0] : null;

    console.log("Props: ", this.props);
    console.log("State: ", this.state);
    console.log(localStorage);
    console.log("LearnedWords: ", this.state.learnedWords);

    return (
      <div className="learning-words-wrapper">
        <label className="learning-words-wrapper__progress">
          Lesson progress: <br />
          <ProgressBar now={numberOfWords - words.length} max={numberOfWords} />
        </label>
        {currentWord ? (
          <div className="learning-words-wrapper__card">
            <div className="sentence d-flex align-items-center">
              {currentWord.textExample.substring(
                0,
                currentWord.textExample.indexOf("<b>")
              )}
              <FormControl
                autoFocus
                className="d-inline w-auto word-input"
                style={{ backgroundColor: inputBG }}
                aria-describedby="basic-addon1"
                value={input}
                onChange={(e) => this.handleInput(e)}
                onKeyPress={(e) => {
                  this.handleInputEnter(e);
                }}
                onBlur={(e) => this.checkAnswer(e)}
              />
              {currentWord.textExample.substring(
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
                  {informationTranscription && (
                    <div>Транскрипция: {currentWord.transcription}</div>
                  )}
                </div>
                {informationDescription && (
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
                )}
                {informationExample && (
                  <div className="example">
                    <div>
                      Пример: {currentWord.textExampleTranslate}
                      <Button
                        className="sound"
                        onClick={() =>
                          this.playSound(
                            currentWord.audioExample,
                            defaultVolume
                          )
                        }
                      >
                        Sound
                      </Button>
                    </div>
                  </div>
                )}
                {informationPicture && (
                  <div className="learning-words-wrapper__card__media">
                    <div className="media-wrapper">
                      <div className="picture">
                        <img src={mediaStorage + currentWord.image} alt="" />
                      </div>
                      <Button
                        className="sound"
                        onClick={() =>
                          this.playSound(currentWord.audio, defaultVolume)
                        }
                      >
                        Sound
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>Loading data... Please wait.</div>
        )}
        <div className="learning-words-wrapper__panel">
          <Button className="learning-words-wrapper__settings-btn">
            Settings
          </Button>
          {levelButtons && (
            <div className="learning-words-wrapper__difficulty">
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="0"
                  onChange={(e) => this.radioSelect(e)}
                />
                Повтор
              </label>
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="4"
                  onChange={(e) => this.radioSelect(e)}
                />
                Удалить
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
          )}
          <div className="learning-words-wrapper__controls">
            <Button
              className="learning-words-wrapper__controls-btn"
              disabled={
                (levelButtons && difficulty === "") ||
                answer === "" ||
                answer === "wrong"
              }
              onClick={() => this.NextWordBtnClick(currentWord)}
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
