import React from "react";
import { connect } from "react-redux";
import {
  pushWordInResultArr,
  dellWordFromResultArr,
} from "../../../redux/actions";

class Droppable extends React.Component {
  drop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("transfer");
    const elId = document.getElementById(data);
    if (
      elId.classList.contains("result")
      || elId.classList.contains("error")
      || (elId.classList.contains("correct")
        && e.target.id !== elId.parentElement.id)
    ) {
      this.props.dellWordFromResultArr(
        this.props.arrOfRandomWords,
        data,
        this.props.arrOfResult,
      );
    } else if (e.target.id !== elId.parentElement.id) {
      this.props.pushWordInResultArr(
        this.props.arrOfRandomWords,
        data,
        this.props.arrOfResult,
      );
    }
  };

  allowDrop = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div
        id={this.props.id}
        onDrop={this.drop}
        onDragOver={this.allowDrop}
        className="droppable"
      >
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  arrOfRandomWords: state.puzzleGame.arrOfRandomWords,
  arrOfResult: state.puzzleGame.arrOfResult,
});

const mapDispathToProps = {
  pushWordInResultArr,
  dellWordFromResultArr,
};

export default connect(mapStateToProps, mapDispathToProps)(Droppable);
