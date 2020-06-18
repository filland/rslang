import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { fetchWeatherService } from "./service";

import "./styles.css";
import {
  getCitySelector,
  getLosingFlagSelector,
  getTempSelector,
} from "./selectors";
import Loader from "../common/loader";

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
        <Form onSubmit={this.handleClick}>
          <Form.Group>
            <Form.Control
              type="text"
              ref={this.cityInput}
              placeholder="enter city name"
              id="city-name"
            />
          </Form.Group>
          <Button type="submit">
            Get current temperature
          </Button>
        </Form>
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
