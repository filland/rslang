import { getFormattedTemp } from "./WeatherUtil";

export async function fetchWeather(city) {
  const urlTodayWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`;
  const todayResponse = await fetch(urlTodayWeather);

  if (todayResponse.ok) {
    const todayWeatherData = await todayResponse.json();
    return getFormattedTemp(todayWeatherData.main.temp);
  }
  throw new Error("Weather data response has status code not equal to 200");
}
