import React from 'react';
import heartImg from '../../assets/heart-solid.svg';
import startGameAudio from '../../assets/start.mp3';
import volomeOn from '../../../english-puzzle/assets/images/volume-up-solid.svg';
import volomeOff from '../../../english-puzzle/assets/images/volume-mute-solid.svg';

import './style.scss';
import Timer from './Timer/Timer';

class Game extends React.Component {
  handleKeyPress = ({ keyCode }) => {
    if (!this.props.checkingAnswer) {
      if (keyCode === 49 || keyCode === 97) {
        this.refs.word0.click();
      } else if (keyCode === 50 || keyCode === 98) {
        this.refs.word1.click();
      } else if (keyCode === 51 || keyCode === 99) {
        this.refs.word2.click();
      } else if (keyCode === 52 || keyCode === 100) {
        this.refs.word3.click();
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  componentDidUpdate() {
    const {
      changeWord, numOfCurrentWord, changeWordAfterTimer,
      isWaitingAnswer, changeTimer, audioOn, timeIsOn,
      lifesCount, iKnowArr, iDontKnowArr, currentWordData, gameWasStarted, allWords,
    } = this.props;

    if (!timeIsOn && isWaitingAnswer && gameWasStarted) {
      changeTimer(timeIsOn);
      this.gameTimer = setTimeout(() => {
        if (audioOn && this.props.errorAudioRef.current) {
          this.props.errorAudioRef.current.play();
        }
        changeWordAfterTimer({
          lifesCount, iKnowArr, iDontKnowArr, currentWordData,
        });
        setTimeout(() => {
          changeWord(numOfCurrentWord + 1, allWords);
        }, 800);
      }, 9000);
    }
    if (!isWaitingAnswer) {
      clearTimeout(this.gameTimer);
    }
  }

  answer = React.createRef();

  handleAnswer = ({ target }) => {
    const {
      changeWord, checkAnswer, numOfCurrentWord, lifesCount,
      iKnowArr, iDontKnowArr, currentWordData, checkingAnswer,
      errorAudioRef, correctAudioRef, audioOn, allWords,
    } = this.props;
    if (!checkingAnswer) {
      if (target.id === this.answer.current.id) {
        target.classList.add('true');
        if (audioOn) {
          correctAudioRef.current.play();
        }
      } else {
        const arr = target.parentElement.childNodes;
        for (let i = 0; i < arr.length; i += 1) {
          if (arr[i].id === this.answer.current.id) {
            arr[i].classList.add('true');
          }
        }
        target.classList.add('false');
        if (audioOn) {
          errorAudioRef.current.play();
        }
      }

      checkAnswer({
        target,
        answer: this.answer.current,
        lifesCount,
        iKnowArr,
        iDontKnowArr,
        currentWordData,
      });

      setTimeout(() => {
        changeWord(numOfCurrentWord + 1, allWords);
        if (!checkingAnswer) {
          target.parentElement.childNodes.forEach((el) => el.classList.remove('true', 'false'));
        }
      }, 2000);
    }
  };

  changeVolumeHandler = () => {
    const { changeVolume, audioOn } = this.props;
    changeVolume(audioOn);
  };

  render() {
    const {
      lifesCount, currentWordData, arrOfRandomWords, audioOn, timerIsOff,
      seconds, changeTimerCount, timerOff, animation, isAnimate,
      isWaitingAnswer,
    } = this.props;

    const arr = new Array(lifesCount).fill('');
    return (
      <>
        {
          timerIsOff
            ? <>
              <audio src={startGameAudio} autoPlay={audioOn}></audio>
              <div className='volume' onClick={this.changeVolumeHandler}>
                {
                  audioOn
                    ? <img src={volomeOn} alt='audio' />
                    : <img src={volomeOff} alt='audio' />
                }
              </div>
              <div className='lifesCount'>
                {arr.map((el, i) => (
                  <img src={heartImg} alt='life' key={i} />
                ))}
              </div>

              <div className={
              isWaitingAnswer
                ? 'currentWord'
                : 'currentWord currentWord-anim1'
              }

               ref={this.answer} id={currentWordData.wordTranslate}>
                {currentWordData.word}
              </div>

              <div className='wordsForAnswer'>
                {arrOfRandomWords.map(({ wordTranslate }, i) => (
                  <div className='answer' key={i} id={wordTranslate} onClick={this.handleAnswer} ref={`word${i}`}>
                    {i + 1}. {wordTranslate}
                  </div>
                ))}
              </div>
            </>
            : <Timer seconds={seconds}
              changeTimerCount={changeTimerCount}
              timerOff={timerOff}
              timerIsOff={timerIsOff}
              animation={animation}
              isAnimate={isAnimate}
            />
        }
      </>

    );
  }
}

export default Game;
