import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Sprint.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchWordsService } from "./Service";
import { getWordSelector } from "./Selectors";
import parrot from "./parrot.png";

const propTypes = {
  fetchWords: PropTypes.func.isRequired,
  word: PropTypes.objectOf(PropTypes.any).isRequired,
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: { word: null },
    }
  }

  componentDidMount() {
    const { fetchWords } = this.props;

    fetchWords();
  }

  render() {
    const { word } = this.props;
    console.log(word);
    return (
      <div className="container">
        <div className="d-flex flex-column align-items-center">
          <p className="points my-5">100 очков</p>
          <div className="time d-flex justify-content-center">
            <span className="align-self-center">3</span>
          </div>
          <div className="card d-flex flex-column align-items-center p-5">
            <img className="card-img-top" src={parrot} alt="Parrot" />
            <div className="card-body d-flex flex-column align-items-center p-4">
              <h4 className="card-title mb-4">{word}</h4>
              <h4 className="card-subtitle mb-5 text-muted">управлять</h4>
              <div>
                <a href="https://reactjs.org" className="btn btn-primary mr-2">Правильно!</a>
                <a href="https://reactjs.org" className="btn btn-danger">Неверно</a>
              </div>
            </div>
          </div>
          <div className="arrows d-flex flex-row justify-content-around w-25">
            <p className="arrow left">&#5130;</p>
            <p className="arrow right">&#5125;</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  word: getWordSelector(store),
});

const mapDispatchToProps = {
  fetchWords: fetchWordsService,
};

Game.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
