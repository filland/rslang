import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import './style.scss';

const arrOfStatistics = [
  { label: 'Карточек завершено:', value: 30 },
  { label: 'Правильные ответы:', value: 23 },
  { label: 'Новые слова:', value: 10 },
  { label: 'Самая длинная серия правильных ответов, %', value: 75 },
];

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
            <div className="statistics-wrapper">
                <h3>Серия завершена!</h3>
                <Card style={{ width: '60%' }}>
                    <ListGroup variant="flush">
                        {arrOfStatistics.map(({ label, value, index }) => (
                            <ListGroup.Item key = {`${value}-${index}`}>
                                <div className="statistics-content">
                                    <div className="statistics-name">{label}</div>
                                    <div className="statistics-value">{value}</div>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
            </div>
    );
  }
}
