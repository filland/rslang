import React from 'react';
import { connect } from 'react-redux';
import { startGame } from '../redux/actions';
import './StartPage.scss';

const StartPage = ({ startGame }) => (
  <div className="homePage">
    <div className="description">
      Click on words, collect phrases. <br /> Words can be drag and drop. select
      tooltips in the menu.
    </div>
    {
        <button className="btn btn-warning" onClick={startGame}>
            Start
          </button>

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
