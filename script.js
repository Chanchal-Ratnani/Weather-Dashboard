const apiKey = "738a97018823c3f29a742de01008953f"; // 👈 Apni API key yahan paste karein

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherInfo = document.getElementById("weatherInfo");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    weatherInfo.innerHTML = "<p>⚠️ Please enter a city name.</p>";
    return;
  }
  getWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      weatherInfo.innerHTML = `<p>❌ City "${city}" not found. Please try again.</p>`;
      return;
    }

    weatherInfo.innerHTML = `
      <div class="weather-card">
        <h2>📍 ${data.name}, ${data.sys.country}</h2>
        <div class="temp">${Math.round(data.main.temp)}°C</div>
        <div class="desc">${data.weather[0].description}</div>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
        <p>🌡️ Feels like: ${Math.round(data.main.feels_like)}°C</p>
      </div>
    `;
  } catch (error) {
    weatherInfo.innerHTML = "<p>⚠️ Network error. Please check your connection and try again.</p>";
    console.error("Error:", error);
  }
}