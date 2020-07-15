import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

import './style.scss';

export default class Statistics extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div className="statistics-wrapper">
        <h3>Серия завершена!</h3>
        <ListGroup variant="flush" style={{ width: '60%' }} >
          {data.map(({ label, value }, index) => (
            <ListGroup.Item key={`${value}-${index}`}>
              <div className="statistics-content">
                <div className="statistics-name">{label}</div>
                <div className="statistics-value">{value}</div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div >
    );
  }
}
