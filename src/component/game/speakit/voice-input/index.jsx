import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import micro from '../assets/microphone.svg';
import './styles.scss';

export default function VoiceInput(props) {
  const { recognizedWord } = props;
  return (
    <div className="voice-input-container">
      <div className="voice-input">
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <div className="micro-icon" style={{ backgroundImage: `url(${micro})` }}></ div>
          </InputGroup.Prepend>
          <FormControl
            aria-describedby="basic-addon1"
            value={recognizedWord}
            readOnly
          />
        </InputGroup>
      </div>
    </div>
  );
}
