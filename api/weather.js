// api/weather.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const apiKey = process.env.OPENWEATHER_API_KEY; // Key from Vercel
  const city = 'Valmiera';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=ru&units=metric`;

  try {
    const response = await fetch(url);
    const w = await response.json();

    if (w.cod === 200) {
      const weatherText = `🌤️ Погода у стримера за окном: ${w.weather[0].description}, ${w.main.temp}°C (ощущается как ${w.main.feels_like}°C), 💧Влажность: ${w.main.humidity}%, 💨Ветер: ${w.wind.speed} м/с`;
      res.status(200).send(weatherText);
    } else {
      res.status(200).send('❌ Не удалось получить погоду');
    }
  } catch (error) {
    res.status(200).send('❌ Ошибка сервиса погоды');
  }
};
