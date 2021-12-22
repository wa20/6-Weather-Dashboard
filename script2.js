$(document).ready(function () {
  $(".ui.accordion").accordion();

  $("#currentDayTime").text(moment().format("ddd MMM Do: h:mm a"));
});

var APIKEY = "1796df8da846bd0a206835c82791ce43";
var searchHistory = [];

// Add timezone plugins to day.js

const currentDayEl = document.querySelector("#currentDay");
const currentDayIconEl = document.querySelector("#currentDayIcon");

//=====================================================================================================

function currentWeather(city, data) {}

//=====================================================================================================
//search city function
function searchCity() {
  const location = document.querySelector("#search").value;

  console.log(location);

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIKEY}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("api data:", data);

      //current weather, weather variables
      let city = data.name; console.log("city: ", city);
      let currentTempC = Math.round(data.main.temp) + "°"; console.log("temp: ", currentTempC);
      let currentFeelsLike =  Math.round(data.main.feels_like) + "°"
      let currentMaxTemp = Math.round(data.main.temp_max) + "°" ;
      let currentHumidity = data.main.humidity;
      let CurerntIcon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      // let currentSunrise = new Date(sRise * 1000).toLocaleTimeString([], {timeStyle: 'short'});
      // let currentSunset = new Date(sSet,).toLocaleTimeString([], {timeStyle: 'short'})

      //current weather, element variables
      let card = document.createElement("div");
      let currentDayCard = document.createElement("div");
      let currentDayCity = document.createElement("h2");
      let currentDayTemp = document.createElement('p')
      let currentDayFeelsLike = document.createElement('p')
      let currentDayMaxTemp = document.createElement('p')
      let currentDayHumidity = document.createElement('p')
      let currentDayIcon = document.createElement('img')

    

      //append card
      card.append(currentDayCard);

      currentDayCity.textContent = `${city}`;
      currentDayTemp.textContent = 'Temp: ' + currentTempC
      currentDayFeelsLike.textContent = 'Feels Like: ' + currentFeelsLike
      currentDayMaxTemp.textContent = 'Max Temp: ' + currentMaxTemp
      currentDayHumidity.textContent = 'Humidity: ' + currentHumidity

      
      currentDayCard.append(currentDayCity, currentDayTemp, currentDayFeelsLike, currentDayMaxTemp, currentDayHumidity);

      //append attributes
      currentDayEl.innerHTML = "";
      currentDayEl.append(card);

      let lat = data.coord.lat;
      let lon = data.coord.lon;

      renderWeather(lat, lon);
      
    });
}

//=====================================================================================================
// render current weather

function renderWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${APIKEY}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("data two: ", data);

      // current day weather variables

      const tempC = data.current.temp;

      console.log("tempC", tempC);
    });
}

document.querySelector("#submit").addEventListener("click", searchCity);
