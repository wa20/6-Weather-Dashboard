$(document).ready(function () {
  $(".ui.accordion").accordion();

  $("#currentDayTime").text(moment().format("ddd MMM Do: h:mm a"));
});

// var APIKEY = "1796df8da846bd0a206835c82791ce43";
var APIKEY = "5852465c3a5a6930a12f2ddde19ed235";
var searchHistory = [];

const currentDayEl = document.querySelector("#currentDay");
const currentDayIconEl = document.querySelector("#currentDayIcon");
const forecastCardEl = document.querySelector("#forecastCard");
const forecastEl = document.querySelector("#forecasts");
const searchHistoryEl = document.querySelector("#searchHistory");

//=====================================================================================================

function saveSearch() {
  searchHistoryEl.innerHTML = "";
}

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

      let today = moment().format("ddd MMM Do");
      let city = data.name;
      console.log("city: ", city);
      let currentTempC = Math.round(data.main.temp) + "°";
      console.log("temp: ", currentTempC);
      let currentFeelsLike = Math.round(data.main.feels_like) + "°";
      let currentMaxTemp = Math.round(data.main.temp_max) + "°";
      let currentHumidity = data.main.humidity;

      //current weather icon
      let weatherIcon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      let weatherIconDescription = data.weather[0].description;

      //sunrise and sunset
      let sRise = data.sys.sunrise;
      let currentSunrise = moment.unix(sRise).format("HH:mm");
      let sSet = data.sys.sunset;
      let currentSunset = moment.unix(sSet).format("HH:mm");

      //current weather, element variables
      let card = document.createElement("div");
      let currentDayCard = document.createElement("div");
      let currentDayCity = document.createElement("h3");
      let currentDayTemp = document.createElement("p");
      let currentDayMaxTemp = document.createElement("p");
      let currentDayHumidity = document.createElement("p");
      let currentDaySunrise = document.createElement("p");

      //current icon
      let cardRight = document.createElement("div");
      let currentDayIcon = document.createElement("img");
      let currentDayDesc = document.createElement("h5");

      //append card
      card.append(currentDayCard);
      currentDayCity.textContent = `${city} | ${today}`;
      currentDayTemp.textContent =
        "Temp: " + currentTempC + " | " + "Feels Like: " + currentFeelsLike;
      currentDayMaxTemp.textContent = "Max Temp: " + currentMaxTemp;
      currentDaySunrise.textContent =
        "Sunrise: " + currentSunrise + " | " + "Sunset: " + currentSunset;
      currentDayHumidity.textContent = "Humidity: " + currentHumidity;
      currentDayCard.append(
        currentDayCity,
        currentDayTemp,
        currentDayMaxTemp,
        currentDayHumidity,
        currentDaySunrise
      );

      //append image
      cardRight.setAttribute("class", "flexbox");
      currentDayIcon.setAttribute("src", weatherIcon);
      currentDayIcon.setAttribute("alt", weatherIconDescription);
      currentDayDesc.textContent = weatherIconDescription;
      cardRight.append(currentDayDesc, currentDayIcon);

      //append attributes left col
      currentDayEl.innerHTML = "";
      currentDayEl.append(card);

      //append attributes right col
      currentDayIconEl.innerHTML = "";
      currentDayIconEl.append(cardRight);

      //start weather api
      let lat = data.coord.lat;
      let lon = data.coord.lon;

      renderWeather(lat, lon);
      // searchCity(city)
    })
    .catch(function (err) {
      console.error(err);
    });
}

//=====================================================================================================
// render weather cards

function renderForecastCard(forecast) {
   let cardDate = forecast.dt
  let date = moment.unix(cardDate).format('ddd Do ')
  console.log('date: ', date)
  let temp = Math.round(forecast.temp.day) + "°";
  let feelsLike = Math.round(forecast.feels_like.day) + "°";
  console.log('forecast feels like: ', feelsLike)
  let uvi = forecast.uvi

  //current weather icon
  let weatherIcon = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
  let weatherIconDescription = forecast.weather[0].description;

  //sunrise and sunset
  let sRise = forecast.sunrise;
  let sunrise = moment.unix(sRise).format("HH:mm");
  let sSet = forecast.sunset;
  let sunset = moment.unix(sSet).format("HH:mm");

  //forecast cards, element variables
  let cards = document.createElement("div");
  let content = document.createElement("div");
  let forecastTemp = document.createElement("p");
  let forecastFeelsLike = document.createElement('p');
  let forecastUviCon = document.createElement('div');
  let forecastUvi = document.createElement('p');
  let forecastSun = document.createElement('p');
 

  //set attributes
  cards.setAttribute("class", "ui raised link card");
  content.setAttribute("class", "content");

  
  

  //append to dom
  forecastTemp.textContent = `Temp: ${temp}`;
  forecastFeelsLike.textContent = `Feels Like: ${feelsLike}`
  forecastSun.textContent = `Sunrise:${sunrise}  |  Sunset:${sunset}`;
  
  forecastUviCon.textContent = 'UV Index: '
  forecastUvi.textContent = ` ${uvi}`

if(uvi < 3){
    forecastUvi.setAttribute('class', 'ui green icon button tiny')
  }else if(uvi > 3 && uvi < 7){
    forecastUvi.setAttribute('class', 'ui orange icon button tiny')
  } else {
    forecastUvi.setAttribute('class', 'ui red icon button tiny')
  }



  cards.append(content);
  forecastUviCon.append(forecastUvi)
  content.append(forecastTemp, forecastFeelsLike, forecastUviCon, forecastSun);

  //append to dom

  forecastEl.append(cards);
  // forecastEl.innerHTML = ""
}

function renderWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${APIKEY}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("data two: ", data);

      //current weather, element variables
      let forecastContainer = document.createElement("div");
      let forecastHeading = document.createElement("h3");

      //append element
      forecastHeading.textContent = "Daily Forecast: ";
      forecastContainer.append(forecastHeading);

      //append to dom
      forecastCardEl.innerHTML = "";
      forecastCardEl.append(forecastContainer);
      forecastEl.innerHTML = "";

      for (var i = 0; i < data.daily.length; i++) {
        console.log("for loop data: ", data.daily[i]);
        renderForecastCard(data.daily[i]);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

document.querySelector("#submit").addEventListener("click", searchCity);
