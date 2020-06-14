import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchWeather } from "./WeatherService";
import {
  fetchWeatherSuccess,
  fetchWeatherFail,
  fetchWeatherRequest,
} from "./WeatherAction";
import "./Weather.css";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.cityInput = React.createRef();
  }

  componentDidMount() {
    this.handleClick();
  }

  handleClick = async (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    try {
      // get city name from the input OR use default city name if this is the first render 
      const city = this.cityInput.current.value || this.props.city;
      const { fetchWeatherRequest, fetchWeatherSuccess } = this.props;
      fetchWeatherRequest();
      const currentWeather = await fetchWeather(city);

      // create a fake 2 seconds delay to see loading screen.
      setTimeout(() => {
        fetchWeatherSuccess(currentWeather, city);
      }, 2000);
    } catch (error) {
      const { fetchWeatherFail } = this.props;
      fetchWeatherFail();
    }
  };

  render() {
    const { city, temp, isLoading } = this.props;

    if (isLoading) {
      return (
        <div
          className="weather"
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          Loading data...
        </div>
      );
    }
    return (
      <form className="weather" onSubmit={this.handleClick}>
        <h2>Weather component</h2>
        <p>{`Current temperature in ${city}: ${temp} °C`}</p>
        <div>
          <label>
            City:
            <input
              type="text"
              ref={this.cityInput}
              placeholder="enter city name"
            />
          </label>
        </div>
        <button type="submit" style={{ width: "90%" }}>
          Get current temperature
        </button>
      </form>
    );
  }
}

function fetchRequest(city) {
  return (dispatch) => dispatch(fetchWeatherRequest(city));
}

function fetchSuccess(temp, city) {
  return (dispatch) => dispatch(fetchWeatherSuccess(temp, city));
}

function fetchFail() {
  return (dispatch) => dispatch(fetchWeatherFail());
}

const mapStateToProps = (store) => ({
  isLoading: store.weather.isLoading,
  temp: store.weather.temp,
  city: store.weather.city,
});

const mapDispatchToProps = (dispatch) => ({
  fetchWeatherRequest: (city) => dispatch(fetchRequest(city)),
  fetchWeatherSuccess: (temp, city) => dispatch(fetchSuccess(temp, city)),
  fetchWeatherFail: () => dispatch(fetchFail()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
