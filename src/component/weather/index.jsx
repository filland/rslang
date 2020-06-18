import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchWeatherService } from "./service";

import "./styles.css";
import {
  getCitySelector,
  getLosingFlagSelector,
  getTempSelector,
} from "./selectors";
import Loader from "../../shared-components/loader";

const propTypes = {
  fetchWeather: PropTypes.func.isRequired,
  city: PropTypes.bool.isRequired,
  temp: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

class Weather extends Component {
  constructor(props) {
    super(props);
    this.cityInput = React.createRef();
  }

  componentDidMount() {
    const { fetchWeather } = this.props;

    fetchWeather();
  }

  handleClick = () => {
    const { fetchWeather } = this.props;
    const inputValue = this.cityInput.current.value;

    fetchWeather(inputValue);
  };

  render() {
    const { city, temp, isLoading } = this.props;

    if (isLoading) {
      return (<Loader />);
    }

    return (
      <div className="weather">
        <h2>Weather component</h2>
        <p>{`Current temperature in ${city}: ${temp} °C`}</p>
        <div>
          <label htmlFor="city-name">
            <span>City:</span>
            <input
              type="text"
              ref={this.cityInput}
              placeholder="enter city name"
              id="city-name"
            />
          </label>
        </div>
        <button type="button" onClick={this.handleClick} style={{ width: "90%" }}>
          Get current temperature
        </button>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  isLoading: getLosingFlagSelector(store),
  temp: getTempSelector(store),
  city: getCitySelector(store),
});

const mapDispatchToProps = {
  fetchWeather: fetchWeatherService,
};

Weather.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
