import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import ProgressBar from "react-bootstrap/ProgressBar";
import FormControl from "react-bootstrap/FormControl";
import getUserWords from "../common/word/user-word/selectors";
import getDictionaryWords from "../common/word/dictionary-word/selectors";
import Btn from "../common/Btn";
import {
  prepareWords,
  passDictionaryWordsToUserWords,
} from "../../common/helper/WordsHelper";
import {
  setWordDifficulty,
  setWordDeleted,
} from "../../common/helper/WordUtils";
import Statistics from "../statistics/index";

import "./styles.scss";

const mediaStorage =
  "https://raw.githubusercontent.com/liplyanin/rslang-data/master/";

const defaultVolume = 0.2;

const statisticsData = [
  { label: "Карточек завершено:", value: 30 },
  { label: "Правильные ответы, %:", value: 23 },
  { label: "Новые слова:", value: 10 },
  { label: "Самая длинная серия правильных ответов:", value: 75 },
];

class LearningWords extends Component {
  state = {
    words: [],
    learnedWords: [],
    currentWord: "",
    input: "",
    inputBG: "white",
    difficulty: "",
    answer: "",
    numberOfWords: 2020,
    numberOfNewWords: 0,
    wordsPerDay: 0,
    showStat: false,
    correctAnswers: 0,
    hardWords: 0,
    normalWords: 0,
    easyWords: 0,
    skippedWords: 0,
    repeatedWords: 0,
    deletedWords: 0
  };

  componentDidMount() {
    if (
      !this.state.words.length &&
      this.props.dictionaryWords.length &&
      !this.state.showStat
    ) {
      let { prepareWords } = this.props;
      let preparedWordsObject = prepareWords(5);
      let { preparedWords, newWordsNumber } = preparedWordsObject;
      this.setState({
        words: preparedWords,
        numberOfWords: preparedWords.length,
        numberOfNewWords: newWordsNumber,
      });
    }
  }

  componentDidUpdate() {
    if (
      !this.state.words.length &&
      this.props.dictionaryWords.length &&
      !this.state.showStat
    ) {
      let { prepareWords } = this.props;
      let preparedWordsObject = prepareWords(5);
      let { preparedWords, newWordsNumber } = preparedWordsObject;
      this.setState({
        words: preparedWords,
        numberOfWords: preparedWords.length,
        numberOfNewWords: newWordsNumber,
      });
    }
    if (
      this.state.learnedWords.length === this.state.numberOfWords &&
      !this.state.showStat
    )
      this.setState({ showStat: true });
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

  radioSelectSkip = (e) => {
    this.setState({ difficulty: e.currentTarget.value, answer: "true" });
  };

  NextWordBtnClick = (word) => {
    switch (this.state.difficulty) {
      case "0": {
        this.setState({
          repeatedWords: this.state.repeatedWords + 1,
        });
        this.reinstallWordIntoQueue();
        break;
      }
      case "1": {
        this.setState({
          learnedWords: this.state.learnedWords.concat(
            setWordDifficulty(word, "hard")
          ),
          hardWords: this.state.hardWords + 1,
        });
        this.removeWordFromQueue();
        break;
      }
      case "2": {
        this.setState({
          learnedWords: this.state.learnedWords.concat(
            setWordDifficulty(word, "normal")
          ),
          normalWords: this.state.normalWords + 1,
        });
        this.removeWordFromQueue();
        break;
      }
      case "3": {
        this.setState({
          learnedWords: this.state.learnedWords.concat(
            setWordDifficulty(word, "easy")
          ),
          easyWords: this.state.easyWords + 1,
        });
        this.removeWordFromQueue();
        break;
      }
      case "4": {
        this.setState({
          learnedWords: this.state.learnedWords.concat(setWordDeleted(word)),
          deletedWords: this.state.deletedWords + 1,
        });
        this.removeWordFromQueue();
        break;
      }
      case "5": {
        this.setState({
          learnedWords: this.state.learnedWords.concat(word),
          skippedWords: this.state.skippedWords + 1,
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

  getStatisticsData = () => {
    console.log("Got stat data!");

    return [
      { label: "Карточек завершено:", value: this.state.learnedWords.length },
      { label: "Правильных ответов:", value: this.state.correctAnswers },
      { label: "Новых слов:", value: this.state.numberOfNewWords },
      { label: "Сложных слов:", value: this.state.hardWords },
      { label: "Нормальных слов:", value: this.state.normalWords },
      { label: "Легких слов:", value: this.state.easyWords },
      { label: "Пропущенных слов:", value: this.state.skippedWords },
      { label: "Удаленных слов:", value: this.state.deletedWords },
      { label: "Повторенных слов:", value: this.state.repeatedWords },
    ];
  };

  render() {
    let {
      words,
      difficulty,
      numberOfWords,
      answer,
      input,
      inputBG,
      showStat,
    } = this.state;

    let {
      levelButtons,
      informationDescription,
      informationPicture,
      informationTranscription,
      informationExample,
    } = this.props.settings.optional;

    let currentWord = words.length ? words[0] : null;
    console.log("Props:", this.props);
    console.log("State: ", this.state, "Showstat:", showStat);
    return (
      <div className="learning-words-wrapper">
        <label className="learning-words-wrapper__progress">
          Lesson progress: <br />
          <ProgressBar now={numberOfWords - words.length} max={numberOfWords} />
        </label>
        {currentWord ? (
          !showStat ? (
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
                        <Btn
                          className="sound"
                          onClick={() =>
                            this.playSound(
                              currentWord.audioMeaning,
                              defaultVolume
                            )
                          }
                        >
                          Sound
                        </Btn>
                      </div>
                    </div>
                  )}
                  {informationExample && (
                    <div className="example">
                      <div>
                        Пример: {currentWord.textExampleTranslate}
                        <Btn
                          className="sound"
                          onClick={() =>
                            this.playSound(
                              currentWord.audioExample,
                              defaultVolume
                            )
                          }
                        >
                          Sound
                        </Btn>
                      </div>
                    </div>
                  )}
                  {informationPicture && (
                    <div className="learning-words-wrapper__card__media">
                      <div className="media-wrapper">
                        <div className="picture">
                          <img src={mediaStorage + currentWord.image} alt="" />
                        </div>
                        <Btn
                          className="sound"
                          onClick={() =>
                            this.playSound(currentWord.audio, defaultVolume)
                          }
                        >
                          Sound
                        </Btn>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
              <Statistics data={this.getStatisticsData()} />
            )
        ) : (
            <div>Loading data... Please wait.</div>
          )}
        <div className="learning-words-wrapper__panel">
          <Btn className="learning-words-wrapper__settings-btn">
            Settings
          </Btn>
          {levelButtons && (
            <div className="learning-words-wrapper__difficulty">
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="0"
                  checked={difficulty === "0"}
                  onChange={(e) => this.radioSelect(e)}
                />
                Повтор
              </label>
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="4"
                  checked={difficulty === "4"}
                  onChange={(e) => this.radioSelect(e)}
                />
                Удалить
              </label>
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="5"
                  checked={difficulty === "5"}
                  onChange={(e) => this.radioSelectSkip(e)}
                />
                Пропустить
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
            <Btn
              className="learning-words-wrapper__controls-btn"
              disabled={
                (levelButtons && difficulty === "") ||
                answer === "" ||
                answer === "wrong"
              }
              onClick={() => this.NextWordBtnClick(currentWord)}
            >
              Следующее слово
            </Btn>
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

const mapDispatchToProps = {
  prepareWords,
  passDictionaryWordsToUserWords,
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningWords);
