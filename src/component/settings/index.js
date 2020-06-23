/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { setUserSettings, getUserSettings } from './service';

import './style.css';

const arrOfInformation = [
  { id: 'informationTranslate', label: 'Перевод слова' },
  { id: 'informationDescription', label: 'Предложение с объяснением значения слова' },
  { id: 'informationExample', label: 'Предложение с примером использования изучаемого слова' },
  { id: 'informationTranscription', label: 'Транскрипция слова' },
  { id: 'informationPicture', label: 'Картинка-ассоциация' },
];
const arrOfButtons = [
  { id: 'btnShow', label: "Кнопка 'Показать ответ'" },
  { id: 'btnDelete', label: "Кнопка 'Удалить слово' (исключить слово из изучения)" },
  { id: 'btnComplicated', label: "Кнопка 'Сложные' (поместить слово в группу 'Сложные')" },
];
const arrOfLevelButtons = [
  { id: 'btnAgain', label: "Кнопка 'Снова'" },
  { id: 'btnHard', label: "Кнопка 'Трудно'" },
  { id: 'btnGood', label: "Кнопка 'Хорошо'" },
  { id: 'btnEasy', label: "Кнопка 'Легко'" },
];
export class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSelectWords = this.handleSelectWords.bind(this);
    this.handleSelectCards = this.handleSelectCards.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      optional: {
        informationTranslate: true,
        informationDescription: false,
        informationExample: false,
        informationTranscription: true,
        informationPicture: false,
        btnShow: true,
        btnDelete: true,
        btnComplicated: false,
        btnAgain: true,
        btnHard: true,
        btnGood: true,
        btnEasy: true,
        customSwitch: false,
        newCardsPerDay: 25,
      },
      wordsPerDay: 5,
    };
  }

  componentDidMount() {
    const { getUserSettings } = this.props;
    getUserSettings();
  }

  static getDerivedStateFromProps(nextProps, prevProps) {
    if (JSON.stringify(prevProps.optional) !== JSON.stringify(nextProps.optional)
    || prevProps.wordsPerDay !== nextProps.wordsPerDay) {
      console.log('nextProps.wordsPerDay: ', nextProps.wordsPerDay);
      console.log('prevProps.wordsPerDay: ', prevProps.wordsPerDay);
      console.log('nextProps.optional: ', JSON.stringify(nextProps.optional));
      console.log('prevProps.optional: ', JSON.stringify(prevProps.optional));
      return {
        optional: nextProps.optional,
        wordsPerDay: nextProps.wordsPerDay,
      };
    }
    return null;
  }

  handleSubmit = async () => {
    const { setUserSettings } = this.props;
    setUserSettings(this.state);
  }

  handleCheckbox = (event) => {
    const object = { ...this.state.optional };
    object[event.target.id] = event.target.checked;
    this.setState({ optional: object });
  }

  handleSelectWords = (event) => {
    this.setState({ wordsPerDay: event.target.value });
  }

  handleSelectCards = (event) => {
    const object = { ...this.state.optional };
    object.newCardsPerDay = event.target.value;
    this.setState({ optional: object });
  }

  render() {
    return (
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Информация, отображаемая на карточках:
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Form>
                {arrOfInformation.map(({ id, label }) => (
                  <div key={`information-${id}`} className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id={id}
                      label={label}
                      checked={this.state.optional[id]}
                      onChange={this.handleCheckbox}
                    />
                  </div>
                ))}
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Кнопки, отображаемые на карточках:
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <Form>
                {arrOfButtons.map(({ id, label }) => (
                  <div key={`button-${id}`} className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id={id}
                      label={label}
                      checked={this.state.optional[id]}
                      onChange={this.handleCheckbox}
                    />
                  </div>
                ))}
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="2">
            Кнопки для определения уровня сложности слова:
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <Form>
                {arrOfLevelButtons.map(({ id, label }) => (
                  <div key={`button-${id}`} className="mb-3" >
                    <Form.Check
                      type="checkbox"
                      id={id}
                      label={label}
                      checked={this.state.optional[id]}
                      onChange={this.handleCheckbox}
                    />
                  </div>
                ))}
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Form>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Количество новых слов в день:</Form.Label>
            <Form.Control as="select" custom
              value={this.state.wordsPerDay} onChange={this.handleSelectWords}>
              <option>1</option>
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <Form>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Максимальное количество карточек в день:</Form.Label>
            <Form.Control as="select" custom
              value={this.state.optional.newCardsPerDay} onChange={this.handleSelectCards}>
              <option>10</option>
              <option>25</option>
              <option>30</option>
              <option>35</option>
              <option>40</option>
              <option>45</option>
              <option>50</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <Form>
          <Form.Check
            type="switch"
            id="customSwitch"
            checked={this.state.optional.id}
            onChange={this.handleCheckbox}
            label="Автоматическое воспроизведение звука"
          />
        </Form>
        <br /> <br />
        <Button
          onClick={this.handleSubmit}
          variant="success">Save</Button>{' '}
      </Accordion>
    );
  }
}

const isLoading = (store) => store.settings.isLoading;
const data = (store) => store.settings.isLoading;

const mapStateToProps = (store) => ({
  isLoading: isLoading(store),
  settings: data(store),
});

const mapDispatchToProps = {
  setUserSettings, getUserSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
