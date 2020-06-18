/* eslint-disable react/prefer-stateless-function */
import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import "./style.css";

export default class Settings extends React.Component {
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
                {["checkbox"].map((type) => (
                  <div key={`default-${type}`} className="mb-3">
                    <Form.Check
                      type={type}
                      id={`default-${type}`}
                      label="Перевод слова"
                    />
                    <Form.Check
                      type={type}
                      id={`default-${type}-2`}
                      label="Предложение с объяснением значения слова"
                    />
                    <Form.Check
                      type={type}
                      id={`default-${type}-3`}
                      label="Предложение с примером использования изучаемого слова"
                    />
                    <Form.Check
                      type={type}
                      id={`default-${type}-4`}
                      label="Транскрипция слова"
                    />
                    <Form.Check
                      type={type}
                      id={`default-${type}-5`}
                      label="Картинка-ассоциация"
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
                {["checkbox"].map((type) => (
                  <div key={`default-${type}`} className="mb-3">
                    <Form.Check
                      type={type}
                      id={`default-${type}-6`}
                      label="Кнопка 'Показать ответ'"
                    />
                    <Form.Check
                      type={type}
                      id={`default-${type}-7`}
                      label="Кнопка 'Удалить слово' (исключить слово из изучения)"
                    />
                    <Form.Check
                      type={type}
                      id={`default-${type}-8`}
                      label="Кнопка 'Сложные' (поместить слово в группу 'Сложные') "
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
                {["checkbox"].map((type) => (
                  <div key={`default-${type}`} className="mb-3">
                    <Form.Check
                      type={type}
                      id={`default-${type}-9`}
                      label="Кнопка 'Снова'"
                    />
                    <Form.Check
                      type={type}
                      id={`default-${type}-10`}
                      label="Кнопка 'Трудно'"
                    />
                    <Form.Check
                      type={type}
                      id={`default-${type}-11`}
                      label="Кнопка 'Хорошо'"
                    />
                    <Form.Check
                      type={type}
                      id={`default-${type}-12`}
                      label="Кнопка 'Легко'"
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
            <Form.Control as="select" custom>
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
            <Form.Control as="select" custom>
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
            id="custom-switch"
            label="Автоматическое воспроизведение звука"
          />
        </Form>
      </Accordion>
    );
  }
}
