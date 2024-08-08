import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "57d46cb1c3eb6216ebc2cf7267bf8b34";

  const getWeather = async () => {
    try {
      setError("");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );
      console.log(response.data); // Log the response data
      setWeather(response.data);
    } catch (err) {
      console.error(err); // Log the error
      setError("City not found. Please try again.");
    }
  };

  const getBackgroundImage = () => {
    if (!weather) return "";
    const main = weather.weather[0].main.toLowerCase();
    switch (main) {
      case "clear":
        return "url(/images/Clear.jpg)";
      case "clouds":
        return "url(/images/Cloudy.jpg)";
      case "overcast":
        return "url(/images/Rain.jpg)";
      case "snow":
        return "url(/images/snow.jpg)";
      case "haze":
        return "url(/images/haze.jpg)";
      case "thunderstorm":
        return "url(/images/thunderstorm.jpg)";
      case "rain":
        return "url(/images/Rain.jpg)";
      default:
        return "url(/images/Warm.jpg)";
    }
  };

  return (
    <div
      className="weather-container"
      style={{
        backgroundImage: getBackgroundImage(),
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="content">
        <img
          src="/images/wlogo.png"
          alt="Weather App Logo"
          className="app-logo"
        />
        <h1>Weather-App</h1>
        <div className="search-box">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter location"
          />
          <button onClick={getWeather}>Search</button>
        </div>
        {error && <p className="error">{error}</p>}
        {weather && (
          <div className="glass-card">
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Humidity: {weather.main.humidity} %</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
