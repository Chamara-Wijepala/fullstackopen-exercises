import { useState, useEffect } from "react";
import axios from "axios";
import WeatherDetails from "./WeatherDetails";

export default function CountryDetails({ country }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        const newData = {
          temp: res.data.main.temp,
          wind: res.data.wind.speed,
          icon: res.data.weather[0].icon,
          alt: res.data.weather[0].description,
        };
        setWeather(newData);
      });
  }, []);

  const languages = Object.values(country.languages);

  return (
    <div>
      <h1>{country.name.common}</h1>

      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>

      <h2>languages:</h2>

      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={country.flags.svg} alt={country.flags.alt} />

      <WeatherDetails capitalName={country.capital[0]} weather={weather} />
    </div>
  );
}
