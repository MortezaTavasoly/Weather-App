const loc = document.querySelector(".location");
const details = document.querySelector(".details");
const strong = document.querySelector("strong");
const image = document.querySelector(".image");
const form = document.querySelector("#form");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(search.value)
    .then((e) => {
      const weather = e.weather[0];
      setDetailes(e, weather);
    })
    .catch(() => {
      loc.innerHTML = `Location not Found !`;
      details.innerHTML = `<div class="lists"></div>`;
      strong.innerHTML = `Please Put Your City Name Correctly!`;
      image.src = "./assets/Atmosphere.png";
    });
  search.value = "";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather(search.value)
    .then((e) => {
      const weather = e.weather[0];
      setDetailes(e, weather);
    })
    .catch(() => {
      loc.innerHTML = `Location not Found !`;
      details.innerHTML = `<div class="lists"></div>`;
      strong.innerHTML = `Please Put Your City Name Correctly!`;
      image.src = "./assets/Atmosphere.png";
    });
  search.value = "";
});

const request = async () => {
  const url = "http://ip-api.com/json/?fields=country,city,lat,lon,timezone";
  const req = await fetch(url);
  const json = await req.json();
  return json;
};
const getWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=694a16ace6caa2c6d2756d2e2fcb8bf5`;
  const req = await fetch(url);
  const json = await req.json();
  return json;
};

request()
  .then((e) => {
    getWeather(e.city)
      .then((e) => {
        const weather = e.weather[0];
        setDetailes(e, weather);
      })
      .catch(() => {
        loc.innerHTML = `Location not Found !`;
      });
  })
  .catch(() => {
    console.log("not found");
  });

const setDetailes = (e, weather) => {
  const temp = Math.round(e.main.temp - 273.15);
  const minTemp = Math.round(e.main.temp_min - 273.15);
  const maxTemp = Math.round(e.main.temp_max - 273.15);
  loc.innerHTML = `<h2>${e.sys.country} , ${e.name}</h2>`;
  strong.innerHTML = `Today: <h3> ${weather.main}</h3>`;
  details.innerHTML = `
  <div class="lists" >
  
  <ul class="temps">
    <li class="temp">Temperature: ${temp}°C</li>
    <li class="max-temp">Max-Temp: ${maxTemp}°C</li>
    <li class="min-temp">Min-Temp: ${minTemp}°C</li>
  </ul>

  <ul class="others">
    <li class="pressure">Pressure: ${e.main.pressure} hPa</li>
    <li class="humidity">Humidity: ${e.main.humidity}%</li>
    <li class="visibility">Visibility: ${e.visibility / 1000}.0 Km</li>
  </ul>

  </div>
  `;

  image.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
};
