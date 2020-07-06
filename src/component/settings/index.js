/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import {
  setUserSettings, getUserSettings,
} from './service';

import './style.scss';

const arrOfInformation = [
  { id: 'informationTranslate', label: 'Перевод слова *' },
  { id: 'informationDescription', label: 'Предложение с объяснением значения слова *' },
  { id: 'informationExample', label: 'Предложение с примером использования изучаемого слова *' },
  { id: 'informationTranscription', label: 'Транскрипция слова' },
  { id: 'informationPicture', label: 'Картинка-ассоциация' },
];
const arrOfButtons = [
  { id: 'btnShow', label: "Кнопка 'Показать ответ'" },
  { id: 'btnDelete', label: "Кнопка 'Удалить слово' (исключить слово из изучения)" },
  { id: 'btnComplicated', label: "Кнопка 'Сложные' (поместить слово в группу 'Сложные')" },
];
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSelectWords = this.handleSelectWords.bind(this);
    this.handleSelectCards = this.handleSelectCards.bind(this);
    this.handleSelectLevel = this.handleSelectLevel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validation = this.validation.bind(this);

    this.state = {
      settings: props.settings,
    };
  }

  componentDidMount() {
    const { getUserSettings } = this.props;
    getUserSettings();
  }

  componentDidUpdate(nextProps) {
    if (JSON.stringify(nextProps.settings) !== JSON.stringify(this.props.settings)) {
      this.setState({ settings: this.props.settings });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { setUserSettings } = this.props;
    setUserSettings(this.state.settings);
  }

  handleCheckbox = (event) => {
    const { optional } = this.state.settings;
    optional[event.target.id] = event.target.checked;
    this.setState({ ...optional });
  }

  handleSelectWords = (event) => {
    const { settings } = this.state;
    const wordsPerDay = event.target.value;
    const newObj = { settings: { ...settings, wordsPerDay: Number(wordsPerDay) } };
    this.setState(newObj);
  }

  handleSelectCards = (event) => {
    const { optional } = this.state.settings;
    optional.newCardsPerDay = Number(event.target.value);
    this.setState({ ...optional });
  }

  handleSelectLevel = (event) => {
    const { optional } = this.state.settings;
    optional.difficultyLevel = Number(event.target.value);
    this.setState({ ...optional });
  }

  validation = () => {
    const {
      informationTranslate,
      informationDescription,
      informationExample,
    } = this.state.settings.optional;
    let result = false;
    if (informationTranslate === false && informationDescription === false
      && informationExample === false) {
      result = true;
    }
    return result;
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <br />
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Информация, отображаемая на карточках:
          </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {arrOfInformation.map(({ id, label }) => (
                  <div key={`information-${id}`} className="mb-3">
                    <Form.Check
                      feedback="You must agree before submitting."
                      type="checkbox"
                      id={id}
                      label={label}
                      checked={this.state.settings.optional[id]}
                      onChange={this.handleCheckbox}
                    />
                  </div>
                ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <br />
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Кнопки, отображаемые на карточках:
          </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                {arrOfButtons.map(({ id, label }) => (
                  <div key={`button-${id}`} className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id={id}
                      label={label}
                      checked={this.state.settings.optional[id]}
                      onChange={this.handleCheckbox}
                    />
                  </div>
                ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <br />
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Количество новых слов в день:</Form.Label>
            <Form.Control as="select" custom
             value={this.state.settings.optional.newCardsPerDay}
             onChange={this.handleSelectCards}>
              <option disabled = {this.state.settings.wordsPerDay < 1}>1</option>
              <option disabled = {this.state.settings.wordsPerDay < 5}>5</option>
              <option disabled = {this.state.settings.wordsPerDay < 10}>10</option>
              <option disabled = {this.state.settings.wordsPerDay < 15}>15</option>
              <option disabled = {this.state.settings.wordsPerDay < 20}>20</option>
              <option disabled = {this.state.settings.wordsPerDay < 25}>25</option>
              <option disabled = {this.state.settings.wordsPerDay < 30}>30</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Максимальное количество карточек в день:</Form.Label>
            <Form.Control as="select" custom
              value={this.state.settings.wordsPerDay}
              onChange={this.handleSelectWords}>
              <option>10</option>
              <option>25</option>
              <option>30</option>
              <option>35</option>
              <option>40</option>
              <option>45</option>
              <option>50</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Сложность изучаемых слов - от легкого (1) до сложного (6):</Form.Label>
            <Form.Control as="select" custom
              value={this.state.settings.optional.difficultyLevel}
              onChange={this.handleSelectLevel}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </Form.Control>
          </Form.Group>
          <Form.Check
            type="switch"
            id="customSwitch"
            checked={this.state.settings.optional.customSwitch}
            onChange={this.handleCheckbox}
            label="Автоматическое воспроизведение звука"
          />
          <br />
          <Form.Check
            type="switch"
            id="levelButtons"
            checked={this.state.settings.optional.levelButtons}
            onChange={this.handleCheckbox}
            label="Отображать кнопки для определения уровня сложности слова"
          />
          <br /> <br />
          <div className="btnWrapper">
            <div className="btn">
              <Button
                disabled={this.validation()}
                variant="success"
                type="submit"
              >Save</Button>
            </div>
            <div className={!this.validation() ? 'alert' : 'show'}>
              <Alert key='1' variant='danger'>
                Хотя бы 1 пункт, отмеченный звездочкой (*), должен быть выбран!
          </Alert>
            </div>
          </div>
        </Accordion>
      </Form>
    );
  }
}

const isLoading = (store) => store.settings.isLoading;
const getSettings = (store) => store.settings;

const mapStateToProps = (store) => ({
  isLoading: isLoading(store),
  settings: getSettings(store),
});

const mapDispatchToProps = {
  setUserSettings, getUserSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
