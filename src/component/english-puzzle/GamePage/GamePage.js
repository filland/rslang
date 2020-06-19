import React from 'react';
import { connect } from 'react-redux';
import {
  changeDifficultOfGame,
  changeCurrentString,
  pushWordInResultArr,
  dellWordFromResultArr,
  checkResultArr,
  showCorrectResult,
  pushSentenceInSolvedArr,
  cleanSolvedArr,
  showStatistic,
  showFullImg,
  showTranslate,
  changeAutoPlayAudio,
} from '../redux/actions';

import Dnd from './Dnd/Dnd';
import Results from './Results/Results';
import Hints from './Hints/Hints';
import GameButtons from './Buttons/GameButtons';
import './GamePage.scss';

class GamePage extends React.Component {
  async componentDidMount() {
    const { changeDifficultOfGame, page, level } = this.props;
    await changeDifficultOfGame(page, level);
  }

  handleWordClick = ({ target }) => {
    const {
      dellWordFromResultArr, pushWordInResultArr, arrOfRandomWords, arrOfResult,
    } = this.props;

    if (
      target.classList.contains('result')
      || target.classList.contains('correct')
      || target.classList.contains('error')
    ) {
      dellWordFromResultArr(
        arrOfRandomWords,
        target.id,
        arrOfResult,
      );
    } else {
      pushWordInResultArr(
        arrOfRandomWords,
        target.id,
        arrOfResult,
      );
    }
  };

  handleButtonClick = async (e) => {
    const {
      checkResultArr, arrOfResult, correctArr,
      iKnowArr, arrayOfData, numberOfStr,
      pushSentenceInSolvedArr, imgIsShowed, arrayOfSolvedSentences,
      showFullImg, showStatistic, showCorrectResult, iDontKnowArr,
      changeCurrentString, level, pageForUser,
    } = this.props;

    if (e.target.name === 'check') {
      checkResultArr(
        arrOfResult,
        correctArr,
        iKnowArr,
        arrayOfData,
        numberOfStr,
      );
    } else if (e.target.name === 'continue') {
      if (numberOfStr === 9 && !imgIsShowed) {
        pushSentenceInSolvedArr(
          correctArr,
          arrayOfSolvedSentences,
        );
        showFullImg();
      } else if (imgIsShowed) {
        changeDifficultOfGame(
          level,
          +pageForUser + 1,
        );
      } else {
        pushSentenceInSolvedArr(
          correctArr,
          arrayOfSolvedSentences,
        );
        changeCurrentString(
          numberOfStr,
          arrayOfData,
        );
      }
    } else if (e.target.name === 'results') {
      showStatistic();
    } else {
      showCorrectResult(
        correctArr,
        iDontKnowArr,
        arrayOfData,
        numberOfStr,
      );
    }
  };

  handleGameTools = ({ target }) => {
    const {
      showTranslate, translateIsShowed, changeAutoPlayAudio, autoPlay,
    } = this.props;
    switch (target.alt) {
      case 'translate': {
        return showTranslate(translateIsShowed);
      }
      case 'play': {
        return this.refs.audioRef.play();
      }
      case 'autoPlay': {
        return changeAutoPlayAudio(autoPlay);
      }
      default:
        return '';
    }
  };

  render() {
    const {
      statisticIsShowed, iKnowArr, iDontKnowArr,
      pictureData, autoPlay, arrayOfData, numberOfStr,
      imgIsShowed, arrayOfSolvedSentences, translateIsShowed,
      isDone, isChecked, arrOfRandomWords,
    } = this.props;
    return (
      <div className="gameField">
        {statisticIsShowed ? (
          <Results
            iKnowArr={iKnowArr}
            iDontKnowArr={iDontKnowArr}
            handleButtonClick={this.handleButtonClick}
            pictureData={pictureData}
          />
        ) : (
          ''
        )}

        {autoPlay ? (
          <audio
            autoPlay
            src={`https://raw.githubusercontent.com/liplyanin/rslang-data/master/${
              arrayOfData[numberOfStr].audioExample
            }`}
            ref="audioRef"
          />
        ) : (
          ''
        )}

        <div
          className="solvedSentences"
          style={{
            backgroundImage: `url(https://raw.githubusercontent.com/liplyanin/rslang_data_paintings/master/${this.props.pictureData.imageSrc})`,
            height: (imgIsShowed ? '60vw' : ''),
            backgroundSize: (imgIsShowed ? 'contain' : 'cover'),
          }}
        >
          {imgIsShowed ? (
            ''
          ) : (
            <>
              {arrayOfSolvedSentences.map((el, i) => (
                <div className="item" key={el + i}>
                  {el}
                </div>
              ))}
              <div className="fon" />
            </>
          )}
        </div>
        <div className="game">
          {!imgIsShowed ? (
            <>
              <Hints
                handleGameTools={this.handleGameTools}
                autoPlay={autoPlay}
                translateIsShowed={translateIsShowed}
                arrayOfData={arrayOfData}
                numberOfStr={numberOfStr}
              />
              <Dnd {...this.props} handleWordClick={this.handleWordClick} />
            </>
          ) : (
            <div>
              {pictureData.author}
              -
              {pictureData.name}
              {' '}
              (
              {pictureData.year}
              )
            </div>
          )}

          <GameButtons
            isDone={isDone}
            imgIsShowed={imgIsShowed}
            arrOfRandomWords={arrOfRandomWords}
            isChecked={isChecked}
            handleButtonClick={this.handleButtonClick}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.puzzleGame,
});

const mapDispathToProps = {
  changeDifficultOfGame,
  changeCurrentString,
  pushWordInResultArr,
  dellWordFromResultArr,
  checkResultArr,
  showCorrectResult,
  pushSentenceInSolvedArr,
  cleanSolvedArr,
  showStatistic,
  showFullImg,
  showTranslate,
  changeAutoPlayAudio,
};
export default connect(mapStateToProps, mapDispathToProps)(GamePage);
