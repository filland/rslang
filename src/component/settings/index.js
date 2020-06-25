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
export class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSelectWords = this.handleSelectWords.bind(this);
    this.handleSelectCards = this.handleSelectCards.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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

  handleSubmit = async () => {
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
    optional.newCardsPerDay = event.target.value;
    this.setState({ ...optional });
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
                      checked={this.state.settings.optional[id]}
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
                      checked={this.state.settings.optional[id]}
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
              value={this.state.settings.wordsPerDay}
              onChange={this.handleSelectWords}
              >
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
              value={this.state.settings.optional.newCardsPerDay}
              onChange={this.handleSelectCards}>
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
            checked={this.state.settings.optional.customSwitch}
            onChange={this.handleCheckbox}
            label="Автоматическое воспроизведение звука"
          />
        </Form>
        <br />
        <Form>
          <Form.Check
            type="switch"
            id="levelButtons"
            checked={this.state.settings.optional.levelButtons}
            onChange={this.handleCheckbox}
            label="Отображать кнопки для определения уровня сложности слова"
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
const getSettings = (store) => store.settings;

const mapStateToProps = (store) => ({
  isLoading: isLoading(store),
  settings: getSettings(store),
});

const mapDispatchToProps = {
  setUserSettings, getUserSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
