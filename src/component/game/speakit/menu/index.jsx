import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { GAME_PAGE } from '../constants';
import { setUserDifficulty } from '../../../settings/service';
import './styles.scss';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      difficultyLevel: props.settings.optional.difficultyLevel,
    };
  }

  startGame = () => {
    const { setCurrentPage, setUserDifficulty } = this.props;
    setCurrentPage(GAME_PAGE);
    setUserDifficulty(this.state.difficultyLevel);
  }

  setDifficulty = (difficultyLevel) => {
    this.setState({ difficultyLevel });
  }

  addStar = () => {
    this.setState({ stars: this.state.stars + 1 });
  }

  render() {
    const { difficultyLevel } = this.state;
    const options = Array
      .from({ length: 6 }, (v, i) => i + 1)
      .map((val, i) => <Dropdown.Item key={val} eventKey={i + 1}>{i + 1}</Dropdown.Item>);
    return (<div className="speakit-menu-wrapper">
      <h3>SpeakIt mini-game</h3>
      <div className="speakit-menu">
        <Button variant="primary" onClick={this.startGame}>Start</Button>
        <div>Current difficulty: {difficultyLevel}</div>
        <DropdownButton id="dropdown-basic-button" title="Change difficulty" onSelect={this.setDifficulty}>
          {options}
        </DropdownButton>
      </div>
    </div>);
  }
}

const mapStateToProps = (store) => ({
  settings: store.settings,
});

const mapDispatchToProps = {
  setUserDifficulty,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
