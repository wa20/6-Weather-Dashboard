var APIKEY = "1796df8da846bd0a206835c82791ce43";

// time and date elements
var time = moment().format("HH:mm A");
$("#time").text(time);

var day = moment().format("dddd");
$("#today").text(day);

var date = moment().format("Do MMMM YYYY");
$(".date").text(date);

//temp cards date
var dayOne = moment().add(1, "days").format("ddd");
$("#day1").text(dayOne);

var dayTwo = moment().add(2, "days").format("ddd");
$("#day2").text(dayTwo);

var dayThree = moment().add(3, "days").format("ddd");
$("#day3").text(dayThree);

var dayFour = moment().add(4, "days").format("ddd");
$("#day4").text(dayFour);

var dayFive = moment().add(5, "days").format("ddd");
$("#day5").text(dayFive);

var daySix = moment().add(6, "days").format("ddd");
$("#day6").text(daySix);

//search weather



function searchWeather(cityName) {

   


  var location = document.querySelector("#search").value;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(JSON.stringify(data));

        var lat = data.coord.lat;

        var long = data.coord.lon;

        oneCallApi(lat, long);

      });
}



function oneCallApi(lat, long) {


  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&units=metric&appid=${APIKEY}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.daily[0]);

      // weather temp now
      document.querySelector("#currentTempDay").textContent = data.current.temp + "°";
      document.querySelector("#feelsLikeDay").textContent = data.current.feels_like + "°";
      document.querySelector("#description").textContent = data.current.weather[0].description;

    // // city and country location
    // document.querySelector("#city").textContent = data.name;
    // document.querySelector("#country").textContent = data.sys.country;


    // weather highlights today
    
    // sunrise and sunset
     var sRise = data.daily[0].sunrise
     var sunriseConverted = new Date(sRise * 1000).toLocaleTimeString([], {timeStyle: 'short'});
     console.log(sunriseConverted);

     var sSet = data.daily[0].sunset
     var sunsetConverted = new Date(sSet,).toLocaleTimeString([], {timeStyle: 'short'});
     console.log(sunsetConverted);

     var timeZone = data.timezone;


     document.querySelector("#timezone").textContent = "Timezone: " + timeZone
     document.querySelector("#sunrise").textContent = "Sunrise: " + sunriseConverted
     document.querySelector("#sunset").textContent = "Sunset: " + sunsetConverted
    



     // sunrise and sunset


     document.querySelector("#dayTemp").textContent = "Day: " + data.daily[0].temp.day + "°";

     document.querySelector("#nightTemp").textContent = "Night: " + data.daily[0].temp.night + "°";

     document.querySelector("#humidity").textContent = "humidity: " + data.daily[0].humidity +"%";




    //   document.querySelector("#currentTempEve").textContent = data.daily[0].temp.night;
    //   document.querySelector("#feelsLikeEve").textContent = data.daily[0].feels_like.night;

     // daily temp rest of week days
      document.querySelector("#one .temp").textContent = data.daily[1].temp.day + "°";
      document.querySelector("#two .temp").textContent = data.daily[2].temp.day + "°";
      document.querySelector("#three .temp").textContent = data.daily[3].temp.day + "°";
      document.querySelector("#four .temp").textContent = data.daily[4].temp.day + "°";
      document.querySelector("#five .temp").textContent = data.daily[5].temp.day + "°";
      document.querySelector("#six .temp").textContent = data.daily[6].temp.day + "°";


      // weather icon today
      var iconImage = document.createElement('img');
      iconImage.setAttribute("src",`http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`);
      document.querySelector("#currentWeather").appendChild(iconImage);



      // rest of week weather cards icon
      var iconImage = document.createElement("img");
      iconImage.setAttribute("src",`http://openweathermap.org/img/w/${data.daily[1].weather[0].icon}.png`);
      document.querySelector("#one #icon").appendChild(iconImage);


      var iconImage = document.createElement("img");
      iconImage.setAttribute("src",`http://openweathermap.org/img/w/${data.daily[1].weather[0].icon}.png`);
      document.querySelector("#two #icon").appendChild(iconImage);

      var iconImage = document.createElement("img");
      iconImage.setAttribute(
        "src",
        `http://openweathermap.org/img/w/${data.daily[2].weather[0].icon}.png`
      );
      document.querySelector("#three #icon").appendChild(iconImage);

      var iconImage = document.createElement("img");
      iconImage.setAttribute(
        "src",
        `http://openweathermap.org/img/w/${data.daily[3].weather[0].icon}.png`
      );
      document.querySelector("#four #icon").appendChild(iconImage);

      var iconImage = document.createElement("img");
      iconImage.setAttribute(
        "src",
        `http://openweathermap.org/img/w/${data.daily[4].weather[0].icon}.png`
      );
      document.querySelector("#five #icon").appendChild(iconImage);

      var iconImage = document.createElement("img");
      iconImage.setAttribute(
        "src",
        `http://openweathermap.org/img/w/${data.daily[5].weather[0].icon}.png`
      );
      document.querySelector("#six #icon").appendChild(iconImage);

      
    });
}







// function defaultCity(){


//     var location = document.querySelector("#search").value;

//     if (!location) {

//     return oneCallApi(51.5085, -0.1257)

// } else if (location.length > 0) {

    

//     window.location.reload();

//     // searchWeather()
//   }

// }

// defaultCity ()




document.querySelector(".searchButton").addEventListener("click", searchWeather);



//celsus vs fahrenheit
// const tempC = document.getElementById("tempC");
// const tempF = document.getElementById("tempF")

// var unit = 'metric';


// tempC.addEventListener("click", function (unit) {

//     if (unit === "metric") {
//       unit = "imperial";
//     } else {
//       unit = "imperial";
    
//     }
//   });

//   tempF.addEventListener("click", function (unit) {
//     if (unit === "metric") {
//       unit = "imperial";
//     } else {
//       unit = "imperial";
    
//     }
//   });