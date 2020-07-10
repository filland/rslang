import React, { Component } from 'react';
import star from '../assets/star.svg';
import './styles.scss';

class Progress extends Component {
  render() {
    const { stars } = this.props;
    const starsTemplate = Array
      .from({ length: stars }, (v, i) => i + 1)
      .map((index) => (<div key={index} className="star" style={{ backgroundImage: `url(${star})` }}></ div>));
    return (
      <div className="stars-container">
        {starsTemplate}
      </div>
    );
  }
}

export default Progress;
