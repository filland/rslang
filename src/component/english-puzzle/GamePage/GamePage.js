import React from "react";
import { connect } from "react-redux";
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
} from "../redux/actions";

import Dnd from "./Dnd/Dnd";
import Results from "./Results/Results";
import Hints from "./Hints/Hints";
import GameButtons from "./Buttons/GameButtons";
import "./GamePage.scss";

class GamePage extends React.Component {
  async componentDidMount() {
    await this.props.changeDifficultOfGame(this.props.page, this.props.level);
  }

  handleWordClick = (e) => {
    if (
      e.target.classList.contains("result")
      || e.target.classList.contains("correct")
      || e.target.classList.contains("error")
    ) {
      this.props.dellWordFromResultArr(
        this.props.arrOfRandomWords,
        e.target.id,
        this.props.arrOfResult,
      );
    } else {
      this.props.pushWordInResultArr(
        this.props.arrOfRandomWords,
        e.target.id,
        this.props.arrOfResult,
      );
    }
  };

  handleButtonClick = async (e) => {
    if (e.target.name === "check") {
      this.props.checkResultArr(
        this.props.arrOfResult,
        this.props.correctArr,
        this.props.iKnowArr,
        this.props.arrayOfData,
        this.props.numberOfStr,
      );
    } else if (e.target.name === "continue") {
      if (this.props.numberOfStr === 9 && !this.props.imgIsShowed) {
        this.props.pushSentenceInSolvedArr(
          this.props.correctArr,
          this.props.arrayOfSolvedSentences,
        );
        this.props.showFullImg();
      } else if (this.props.imgIsShowed) {
        await this.props.changeDifficultOfGame(
          this.props.level,
          +this.props.pageForUser + 1,
        );
      } else {
        this.props.pushSentenceInSolvedArr(
          this.props.correctArr,
          this.props.arrayOfSolvedSentences,
        );
        this.props.changeCurrentString(
          this.props.numberOfStr,
          this.props.arrayOfData,
        );
      }
    } else if (e.target.name === "results") {
      this.props.showStatistic();
    } else {
      this.props.showCorrectResult(
        this.props.correctArr,
        this.props.iDontKnowArr,
        this.props.arrayOfData,
        this.props.numberOfStr,
      );
    }
  };

  handleGameTools = (e) => {
    switch (e.target.alt) {
      case "translate": {
        return this.props.showTranslate(this.props.translateIsShowed);
      }
      case "play": {
        return this.refs.audioRef.play();
      }
      case "autoPlay": {
        return this.props.changeAutoPlayAudio(this.props.autoPlay);
      }
      default:
        return "";
    }
  };

  render() {
    return (
      <div className="gameField">
        {this.props.statisticIsShowed ? (
          <Results
            iKnowArr={this.props.iKnowArr}
            iDontKnowArr={this.props.iDontKnowArr}
            handleButtonClick={this.handleButtonClick}
            pictureData={this.props.pictureData}
          />
        ) : (
          ""
        )}

        {this.props.autoPlay ? (
          <audio
            autoPlay
            src={`https://raw.githubusercontent.com/liplyanin/rslang-data/master/${
              this.props.arrayOfData[this.props.numberOfStr].audioExample
            }`}
            ref="audioRef"
          />
        ) : (
          ""
        )}

        <div
          className="solvedSentences"
          style={{
            backgroundImage: `url(https://raw.githubusercontent.com/liplyanin/rslang_data_paintings/master/${this.props.pictureData.imageSrc})`,
            height: (this.props.imgIsShowed ? "60vw" : ""),
            backgroundSize: (this.props.imgIsShowed ? "contain" : "cover"),
          }}
        >
          {this.props.imgIsShowed ? (
            ""
          ) : (
            <>
              {this.props.arrayOfSolvedSentences.map((el, i) => (
                <div className="item" key={el + i}>
                  {el}
                </div>
              ))}
              <div className="fon" />
            </>
          )}
        </div>
        <div className="game">
          {!this.props.imgIsShowed ? (
            <>
              <Hints
                handleGameTools={this.handleGameTools}
                autoPlay={this.props.autoPlay}
                translateIsShowed={this.props.translateIsShowed}
                arrayOfData={this.props.arrayOfData}
                numberOfStr={this.props.numberOfStr}
              />
              <Dnd {...this.props} handleWordClick={this.handleWordClick} />
            </>
          ) : (
            <div>
              {this.props.pictureData.author}
              -
              {this.props.pictureData.name}
              {" "}
              (
              {this.props.pictureData.year}
              )
            </div>
          )}

          <GameButtons
            isDone={this.props.isDone}
            imgIsShowed={this.props.imgIsShowed}
            arrOfRandomWords={this.props.arrOfRandomWords}
            isChecked={this.props.isChecked}
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
