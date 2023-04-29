const apiKey = "cd54ba67a32d3c9c40678d8130432092";

const weatherData = document.getElementById("weather-data");
const cityInput = document.getElementById("city-input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityValue = cityInput.value;

  getWeatherdata(cityValue);
  //  console.log(cityValue)
});

async function getWeatherdata(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);

    const temprature = Math.round(data.main.temp);
    const description = data.weather[0].description;

    const icon = data.weather[0].icon;

    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity:${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];
    weatherData.querySelector(
        ".icon"
      ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="not found">`
    weatherData.querySelector(
        ".temperature"
      ).textContent = `${temprature}°C`

      weatherData.querySelector(
        ".description"
      ).textContent = description;

      weatherData.querySelector(
        ".details"
      ).innerHTML = details.map((detail) =>` <div>${detail}</div>`).join('')

      // we used the join method because we are getting comma without join method on the view of our website



  } catch (error) {
    weatherData.querySelector(
        ".temperature"
      ).textContent = ''

      weatherData.querySelector(
        ".description"
      ).textContent ='Error happen please try again later'

      weatherData.querySelector(
        ".details"
      ).innerHTML = ''

  }
}
