var APIKEY = "1796df8da846bd0a206835c82791ce43";

// time and date elements
var time = moment().format("HH:mm A");
$("#time").text(time);

var day = moment().format("dddd");
$("#today").text(day);

var date = moment().format("Do MMMM YYYY");
$(".date").text(date);

//temp cards date
var dayOne = moment().format("ddd");
$("#day1").text(dayOne);

var dayTwo = moment().add(1, "days").format("ddd");
$("#day2").text(dayTwo);

var dayThree = moment().add(2, "days").format("ddd");
$("#day3").text(dayThree);

var dayFour = moment().add(3, "days").format("ddd");
$("#day4").text(dayFour);

var dayFive = moment().add(4, "days").format("ddd");
$("#day5").text(dayFive);

var daySix = moment().add(5, "days").format("ddd");
$("#day6").text(daySix);

//search weather

function searchWeather() {
  var location = document.querySelector("#search").value;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(JSON.stringify(data));

   var lat =  data.coord.lat

   var long =  data.coord.lon

      oneCallApi(lat, long)
    });
}

function oneCallApi (lat, long) {

    fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&appid=${APIKEY}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
            console.log(data)
          console.log(data.daily[0]);

         // daily temp
          document.querySelector("#one .temp").textContent = data.daily[0].temp.day;
          document.querySelector("#two .temp").textContent = data.daily[1].temp.day;
          document.querySelector("#three .temp").textContent = data.daily[2].temp.day;
          document.querySelector("#four .temp").textContent = data.daily[3].temp.day;
          document.querySelector("#five .temp").textContent = data.daily[4].temp.day;
          document.querySelector("#six .temp").textContent = data.daily[5].temp.day;
          


          // weather icon
          var iconImage = document.createElement("img");
          iconImage.setAttribute('src',  `http://openweathermap.org/img/w/${data.daily[0].weather[0].icon}.png`);
          document.querySelector("#one #icon").appendChild(iconImage);

          var iconImage2 = document.createElement("img");
          iconImage2.setAttribute('src',  `http://openweathermap.org/img/w/${data.daily[1].weather[0].icon}.png`);
          document.querySelector("#two #icon").appendChild(iconImage2);
              
          var iconImage3 = document.createElement("img");
          iconImage3.setAttribute('src',  `http://openweathermap.org/img/w/${data.daily[2].weather[0].icon}.png`);
          document.querySelector("#three #icon").appendChild(iconImage3);

          var iconImage4 = document.createElement("img");
          iconImage4.setAttribute('src',  `http://openweathermap.org/img/w/${data.daily[3].weather[0].icon}.png`);
          document.querySelector("#four #icon").appendChild(iconImage4);

          var iconImage5 = document.createElement("img");
          iconImage5.setAttribute('src',  `http://openweathermap.org/img/w/${data.daily[4].weather[0].icon}.png`);
          document.querySelector("#five #icon").appendChild(iconImage5);

          var iconImage6 = document.createElement("img");
          iconImage6.setAttribute('src',  `http://openweathermap.org/img/w/${data.daily[5].weather[0].icon}.png`);
          document.querySelector("#six #icon").appendChild(iconImage6);

          })


}





document.querySelector(".searchButton").addEventListener("click", searchWeather);

