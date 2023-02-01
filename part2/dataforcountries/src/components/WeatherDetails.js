export default function WeatherDetails({ capitalName, weather }) {
  if (!weather) return null;

  return (
    <>
      <h2>Weather in {capitalName}</h2>

      <p>temperature {weather.temp} Celsius</p>

      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
        alt={weather.alt}
      />

      <p>wind {weather.wind} m/s</p>
    </>
  );
}
