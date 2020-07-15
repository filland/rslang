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
    return (<div className="speakit-menu-container">
      <div className="speakit-menu-inner-container">
        <div className="speakit-rules">
          <div className="description">
            <h1>SpeakIt</h1>
            <h2>Приложение для проверки произношения</h2>
            <p>
              <ul>
                <li>Слова выводятся на страницу группами по 10 слов. Возле каждого слова отображается транскрипция и иконка аудио.</li>
                <li>При клике по слову звучит его произношение, выводятся картинка и перевод.</li>
                <li>Произнесённые пользователем слова распознаются и отображаются в текстовом виде. Проверка правильности произношения происходит путём сравнения распознанного текста с написанием слова.</li>
              </ul>
            </p>
          </div>
        </div>
        <div className="speakit-menu-wrapper">
          <div className="speakit-menu">
            <Button variant="primary" onClick={this.startGame}>Start</Button>
            <div>Current difficulty: {difficultyLevel}</div>
            <DropdownButton id="dropdown-basic-button" title="Change difficulty" onSelect={this.setDifficulty}>
              {options}
            </DropdownButton>
          </div>
        </div>
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
