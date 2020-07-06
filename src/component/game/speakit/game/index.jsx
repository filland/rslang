import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Word from '../word';
import VoiceInput from '../voice-input';
import Stepper from '../stepper';
import blankPicture from '../assets/blank.jpg';
import './styles.scss';
import { prepareWords } from '../../../../common/helper/WordsHelper';

class Game extends Component {
  render() {
    const { prepareWords } = this.props;
    const { preparedWords } = prepareWords(10);
    const wordsTemplate = preparedWords.map((word) => (<Word key={word.id} word={word}></Word>));

    return (<div className="speakit-container">
      <div className="speakit">
        <Stepper></Stepper>
        <div className="picture-container">
          <img className="picture" src={blankPicture} alt="test" />
        </div>
        <VoiceInput></VoiceInput>
        <div className="words">
          {wordsTemplate}
        </div>
        <div className="controls">
          <Button>Restart</Button>
          <Button className="big-button">Speak please</Button>
          <Button>Finish</Button>
        </div>
      </div>
    </div>);
  }
}

const mapStateToProps = (store) => ({
});

const mapDispatchToProps = {
  prepareWords,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);