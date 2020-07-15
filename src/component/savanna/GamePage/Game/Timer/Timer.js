import React from 'react';
import './style.scss';

class Timer extends React.Component {
  componentDidMount() {
    const {
      changeTimerCount, seconds, animation, isAnimate,
    } = this.props;
    setTimeout(() => {
      animation(isAnimate);
    }, 10);
    setTimeout(() => {
      changeTimerCount(seconds, isAnimate);
    }, 1000);
  }

  componentDidUpdate() {
    const {
      changeTimerCount, seconds, timerOff, isAnimate,
    } = this.props;

    if (seconds) {
      setTimeout(() => {
        changeTimerCount(seconds, isAnimate);
      }, 1000);
    } else {
      timerOff();
    }
  }

  render() {
    return (
        <div className={this.props.isAnimate ? 'timer timer-aimation' : 'timer'}>
          {this.props.seconds}
        </div>

    );
  }
}

export default Timer;
