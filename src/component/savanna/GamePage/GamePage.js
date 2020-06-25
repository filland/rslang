import React from 'react';
import './style.scss';

class GamePage extends React.Component {
  render() {
    return (
        <>
            <div className='currentWord'>
                <b> {this.props.arrOfCurrentWords[0].word}</b>
            </div>
            <div className='wordsForAnswer'>
                {this.props.arrOfCurrentWords.map((el) => (
                    <div className='answer'>{el.wordTranslate}</div>
                ))}
            </div>
        </>
    );
  }
}

export default GamePage;
