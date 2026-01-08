// api/weather.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const apiKey = process.env.OPENWEATHER_API_KEY; // Key from Render
  const city = 'Valmiera';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=ru&units=metric`;

  try {
    const response = await fetch(url);
    const w = await response.json();

    // Check if the OpenWeatherMap API request was successful
    if (w.cod === 200) {
      // Send response as JSON for Fossabot to parse
      res.status(200).json({
        success: true,
        city: w.name,
        description: w.weather[0].description,
        temp: w.main.temp,
        feels_like: w.main.feels_like,
        humidity: w.main.humidity,
        wind_speed: w.wind.speed
      });
    } else {
      // OpenWeatherMap returned an error (e.g., city not found)
      res.status(200).json({
        success: false,
        error: '❌ Не удалось получить данные о погоде.'
      });
    }
  } catch (error) {
    // Network error or other fetch failure
    res.status(200).json({
      success: false,
      error: '❌ Ошибка сервиса погоды.'
    });
  }
};
