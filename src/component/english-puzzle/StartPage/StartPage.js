import React from 'react';
import { connect } from 'react-redux';
import { startGame } from '../redux/actions';
import Loader from '../../common/loader/index';
import Btn from '../../common/Btn';
import './StartPage.scss';

const StartPage = ({ startGame, dictionaryWords }) => (
  <div className="homePage">
    <div className="description">
      Click on words, collect phrases. <br /> Words can be drag and drop. select
      tooltips in the menu.
    </div>
    {
      dictionaryWords.length !== 0
        ? <Btn className="btn btn-warning" onClick={startGame}>
          Start
          </Btn>
        : <Loader />

    }

  </div>
);

const mapStateToProps = (state) => ({
  gameWasStarted: state.puzzleGame.gameWasStarted,
});

const mapDispathToProps = {
  startGame,
};

export default connect(mapStateToProps, mapDispathToProps)(StartPage);
