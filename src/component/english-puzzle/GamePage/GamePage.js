import React from 'react';
import { connect } from 'react-redux';
import {
  changeDifficultOfGame,
  changeCurrentString,
  changeResultArr,
  changeArrOfRandomWords,
  disableIsChecked,
  checkResultArr,
  showCorrectResult,
  pushSentenceInSolvedArr,
  cleanSolvedArr,
  showStatistic,
  showFullImg,
  showTranslate,
  changeAutoPlayAudio,
} from '../redux/actions';
import setUserStatistics from '../../long-term-statistics/statisticsService/statisticsService';
import { passDictionaryWordsToUserWords, prepareWords } from '../../../common/helper/WordsHelper';

import Dnd from './Dnd/Dnd';
import Results from './Results/Results';
import Hints from './Hints/Hints';
import GameButtons from './Buttons/GameButtons';
import './GamePage.scss';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
  }

  componentDidMount() {
    const {
      changeDifficultOfGame, page, level, prepareWords,
    } = this.props;
    const words = prepareWords(100).preparedWords;
    changeDifficultOfGame(level, page, words);
  }

  handleWordClick = ({ target }) => {
    const {
      arrOfRandomWords, arrOfResult, changeArrOfRandomWords, changeResultArr,
    } = this.props;

    if (
      target.classList.contains('result')
    ) {
      const i = target.parentElement.id;
      arrOfResult.splice(i, 1, '');
      const n = arrOfRandomWords.indexOf('');
      arrOfRandomWords.splice(n, 1, target.innerText);
      changeResultArr(arrOfResult);
      changeArrOfRandomWords(arrOfRandomWords);
    } else {
      const n = arrOfResult.indexOf('');
      const i = target.parentElement.id;
      arrOfRandomWords.splice(i, 1, '');
      arrOfResult.splice(n, 1, target.innerText);

      changeResultArr(arrOfResult);
      changeArrOfRandomWords(arrOfRandomWords);
    }
  };

  handleButtonClick = async (e) => {
    const {
      checkResultArr, arrOfResult, correctArr,
      iKnowArr, arrayOfData, numberOfStr,
      pushSentenceInSolvedArr, imgIsShowed, arrayOfSolvedSentences,
      showFullImg, showStatistic, showCorrectResult, iDontKnowArr,
      changeCurrentString, level, pageForUser, changeDifficultOfGame,
      setUserStatistics, passDictionaryWordsToUserWords,
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
        showFullImg(iDontKnowArr, iKnowArr, setUserStatistics, passDictionaryWordsToUserWords);
      } else if (imgIsShowed) {
        changeDifficultOfGame(
          level,
          +pageForUser + 1,
          arrayOfData,
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
        return this.audioRef.current.play();
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
      isDone, isChecked, arrOfRandomWords, disableIsChecked,
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
                audioRef={this.audioRef}
              />
              <Dnd {...this.props}
               disableIsChecked={disableIsChecked}
               handleWordClick={this.handleWordClick}/>
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
  dictionaryWords: state.dictionaryWords.words,
  userWords: state.userWords.words,
});

const mapDispathToProps = {
  changeDifficultOfGame,
  changeCurrentString,
  changeArrOfRandomWords,
  changeResultArr,
  disableIsChecked,
  checkResultArr,
  showCorrectResult,
  pushSentenceInSolvedArr,
  cleanSolvedArr,
  showStatistic,
  showFullImg,
  showTranslate,
  changeAutoPlayAudio,
  prepareWords,
  setUserStatistics,
  passDictionaryWordsToUserWords,
};
export default connect(mapStateToProps, mapDispathToProps)(GamePage);
