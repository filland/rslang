import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Word from './Word';
import VoiceInput from './VoiceInput';
import Stepper from './Stepper';
import blankPicture from './assets/blank.jpg';
import './Game.scss';

class Game extends Component {
  render() {
    return (<div className="speakit-container">
            <div className="speakit">
                <Stepper></Stepper>
                <div className="picture-container">
                    <img className="picture" src={blankPicture} alt="test" />
                </div>
                <VoiceInput></VoiceInput>
                <div className="words">
                    <Word></Word>
                    <Word></Word>
                    <Word></Word>
                    <Word></Word>
                    <Word></Word>
                    <Word></Word>
                    <Word></Word>
                    <Word></Word>
                    <Word></Word>
                    <Word></Word>
                </div>
                <div className="controls">
                    <Button>Restart</Button>
                    <Button className="big-button">Speak please</Button>
                    <Button>Finish</Button>
                </div>
            </div>
        </div >);
  }
}

export default Game;
