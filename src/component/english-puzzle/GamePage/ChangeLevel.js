import React from 'react';
import { connect } from 'react-redux';
import {
  setInputValue,
  changeDifficultOfGame,
} from '../redux/actions';

class GameItems extends React.Component {
  onChangeInputHandler = (event) => {
    this.props.setInputValue(event.target.name, event.target.value);
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    const levelValue = this.refs.level.value;
    const pageValue = this.refs.page.value;
    this.props.changeDifficultOfGame(levelValue, pageValue);
  };

  render() {
    return (

      <form>
        <input
          type="number"
          min="1"
          max="6"
          required
          value={this.props.level}
          name="level"
          onChange={this.onChangeInputHandler}
          ref="level"
        />
        <input
          type="number"
          min="1"
          max="60"
          required
          value={this.props.pageForUser}
          name="pageForUser"
          onChange={this.onChangeInputHandler}
          ref="page"
        />
        <button className="btn btn-light" onClick={this.onSubmitHandler}>
          change
        </button>
      </form>

    );
  }
}

const mapStateToProps = (state) => ({
  ...state.puzzleGame,
});

const mapDispathToProps = {
  setInputValue,
  changeDifficultOfGame,
};

export default connect(mapStateToProps, mapDispathToProps)(GameItems);
