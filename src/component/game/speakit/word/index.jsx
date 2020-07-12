import React, { Component } from 'react';
import './styles.scss';
import { FILES_BASE } from '../constants';

export default class Word extends Component {
  constructor(props) {
    super(props);
    const { word } = props;
    this.audio = new Audio(word.audio.length > 200 ? `data:audio/mp3;base64,${word.audio}` : FILES_BASE + word.audio);
  }

  playAudio = () => {
    this.audio.play();
  };

  handleClick = () => {
    const { word, handleClick } = this.props;
    const pathToPic = word.image.startsWith('files/') ? FILES_BASE + word.image : `data:image/png;base64,${word.image}`;
    handleClick(word.wordTranslate, pathToPic, () => {
      this.playAudio();
    });
  }

  render() {
    const { word } = this.props;
    return (
      <div className={`word ${word.answered ? 'word-answered' : ''}`} onClick={this.handleClick}>
        <div className="speaker">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fillRule="evenodd"></path></svg>
        </div>
        <div className="word-info">
          <div>{word.word}</div>
          <div>{word.transcription}</div>
        </div>
      </div>);
  }
}
