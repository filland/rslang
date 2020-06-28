import React from 'react';
import heartImg from '../assets/heart-solid.svg';
import './style.scss';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.answer = React.createRef();
  }

  handleAnswer = ({ target }) => {
    const {
      changeWord, checkAnswer, currentPage, currentLevel, numOfCurrentWord, data,
    } = this.props;

    if (!target.parentElement.classList.contains('clicked')) {
      checkAnswer(target, this.answer.current);
      target.parentElement.classList.add('clicked');

      setTimeout(() => {
        const arr = target.parentElement.childNodes;

        for (let i = 0; i < arr.length; i += 1) {
          arr[i].className = 'answer';
        }
        target.parentElement.classList.remove('clicked');
        changeWord(currentPage, currentLevel, numOfCurrentWord + 1, data);
      }, 2000);
    }
  }

  render() {
    const {
      arrOfRandomWords, currentWordData, lifesCount,
    } = this.props;
    const arr = new Array(lifesCount).fill('');
    return (
      <>
        <div className='lifesCount'>
          {arr.map((el, i) => (
            <img src={heartImg} alt='life' key={i}/>
          ))}
        </div>
        <div className='currentWord' ref={this.answer} id={currentWordData.wordTranslate}>
          {currentWordData.word}
        </div>
        <div className='wordsForAnswer'>
          {arrOfRandomWords.map((el, i) => (
            <div className='answer' key={el.wordTranslate} id={el.wordTranslate} onClick={this.handleAnswer}>
              {i + 1}. {el.wordTranslate}
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default GamePage;
