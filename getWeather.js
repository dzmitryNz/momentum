import { ru, en } from './dict.js';
const weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    weatherDescription = document.querySelector('.weather-description'),
    humidity = document.querySelector('.humidity'),
    wind = document.querySelector('.wind'),
    owm_id = "Your_ID_Here";

export default async function getWeather(defCity) {
  let language = en;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${defCity}&lang=en&appid=${owm_id}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod !== 200) {
    alert(`Ошибка ${data.cod} \n ${data.message}!`);
    weatherIcon.textContent = '';
    temperature.textContent = 'No Data';
    weatherDescription.textContent = '';
    humidity.textContent = 'No Data';
    wind.textContent = '';
    console.log(data)
    return
  }
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
  humidity.textContent = `${language.humidity}: ${data.main.humidity}%`;
  wind.textContent = `${language.wind}: ${data.wind.speed}m/s`;

  setTimeout(getWeather, 6000000);
}
