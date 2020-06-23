import React from "react";
import { Component } from "react";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import FormControl from "react-bootstrap/FormControl";

import "./LearningWords.css";

class LearningWords extends Component {
  state = {
    words: [],
    currentWord: "",
  };
  componentDidMount() {
    fetch("https://afternoon-falls-25894.herokuapp.com/words?page=2&group=0")
      .then((response) => response.json())
      .then((res) => this.setState({ words: res }));
  }

  render() {
    console.log(this.state.words);

    return (
      <div className="learning-words-wrapper">
        <label>
          Lesson progress: <br />
          <ProgressBar now={60} className="learning-words-wrapper__progress" />
        </label>
        {this.state.words[0] && (
          <div className="learning-words-wrapper__card">
            <div className="learning-words-wrapper__sentence d-flex align-items-center">
              {this.state.words[0].textExample.substring(
                0,
                this.state.words[0].textExample.indexOf("<b>")
              )}
              <FormControl
                autoFocus
                className="d-inline w-auto"
                aria-describedby="basic-addon1"
              />
              {this.state.words[0].textExample.substring(
                this.state.words[0].textExample.indexOf("</b>") + 4,
                this.state.words[0].textExample.length
              )}
            </div>
            <div>Word: Изучить</div>
          </div>
        )}
        <div className="learning-words-wrapper__panel">
          <Button className="learning-words-wrapper__settings-btn">
            Settings
          </Button>
          <div className="learning-words-wrapper__difficulty">
            <label>
              <input type="radio" name="difficulty" /> Легко
            </label>
            <label>
              <input type="radio" name="difficulty" /> Нормально
            </label>
            <label>
              <input type="radio" name="difficulty" /> Сложно
            </label>
          </div>
          <div className="learning-words-wrapper__controls">
            <Button className="learning-words-wrapper__controls-btn">
              Повторить слово
            </Button>
            <Button className="learning-words-wrapper__controls-btn">
              Следующее слово
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default LearningWords;
