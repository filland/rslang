import React from 'react';
import { connect } from 'react-redux';
import { setInputValue, changeDifficultOfGame } from '../redux/actions';
import { prepareWords } from '../../../common/helper/WordsHelper';
import Btn from '../../common/Btn';

class GameItems extends React.Component {
  onChangeInputHandler = (event) => {
    this.props.setInputValue(event.target.name, event.target.value);
  };

  onSubmitHandler = (event) => {
    const { prepareWords } = this.props;
    event.preventDefault();
    const levelValue = this.refs.level.value;
    const pageValue = this.refs.page.value;
    const words = prepareWords(100).preparedWords;
    this.props.changeDifficultOfGame(levelValue, pageValue, words);
  };

  render() {
    return (

      <form>
        <input
          className='form-control form-control-sm'
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
          className='form-control form-control-sm'
          type="number"
          min="1"
          max="30"
          required
          value={this.props.pageForUser}
          name="pageForUser"
          onChange={this.onChangeInputHandler}
          ref="page"
        />
        <Btn className="btn btn-light" onClick={this.onSubmitHandler}>
          change
        </Btn>
      </form>

    );
  }
}

const mapStateToProps = (state) => ({
  ...state.puzzleGame,
  dictionaryWords: state.dictionaryWords.words,
  userWords: state.userWords.words,
});

const mapDispathToProps = {
  setInputValue,
  changeDifficultOfGame,
  prepareWords,
};

export default connect(mapStateToProps, mapDispathToProps)(GameItems);
