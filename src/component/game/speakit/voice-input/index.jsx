import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import './styles.scss';

export default function VoiceInput() {
    return (
        <div className="voice-input-container">
            <div className="voice-input">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </div>
        </div>
    );
}
