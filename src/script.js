//The following code sets the current day and time:

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hour = (now.getHours() < 10 ? "0" : "") + now.getHours();
let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
let currentDayAndTime = document.querySelector("#current-day-and-time");
currentDayAndTime.innerHTML = `${day} ${hour}:${minutes}`;

//The following code reads the city from the search bar input and posts it on the page
//it also changes most of the data for today to match that city (except the current day and time in that)
let city = document.querySelector("h1");
let apiKey = "cc6881d929e8ea4776abf51199d73643";
let humidityElement = document.querySelector("#current-humidity");
let descriptionElement = document.querySelector("#current-weather-text");
let windElement = document.querySelector("#current-wind");
let pressureElement = document.querySelector("#current-pressure");
let temperatureElement = document.querySelector("#current-temperature-figure");
let weatherSymbolElement = document.querySelector("#current-weather-symbol");

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar-input");
  let searchInputValueUpperCase = searchInput.value
    .toLowerCase()
    .replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });
  if (searchInputValueUpperCase) {
    city.innerHTML = searchInputValueUpperCase;

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInputValueUpperCase}&units=metric`;
    function showTemperature(response) {
      let icon = response.data.weather[0].icon;
      let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      console.log(icon);
      console.log(iconUrl);
      let temperature = Math.round(response.data.main.temp);
      let description = response.data.weather[0].description;
      let humidity = response.data.main.humidity;
      let wind = response.data.wind.speed;
      let pressure = response.data.main.pressure;

      temperatureElement.innerHTML = `${temperature}`;
      descriptionElement.innerHTML = `${description}`;
      humidityElement.innerHTML = ` ${humidity}`;
      windElement.innerHTML = ` ${wind}`;
      pressureElement.innerHTML = `${pressure}`;
    }

    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  } else {
    city.innerHTML = `Please type a city...`;
  }
}

let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", search);

//the following code changes the data to that of the current location of the device
function currentsearch(eventCurrent) {
  eventCurrent.preventDefault();
  function findPosition(position) {
    let latitude = `${position.coords.latitude}`;
    let longitude = `${position.coords.longitude}`;
    let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    function showTemperatureCurrent(response) {
      let icon = response.data.weather[0].icon;
      console.log(icon);
      let temperatureCurrent = Math.round(response.data.main.temp);
      temperatureElement.innerHTML = `${temperatureCurrent}`;
      let descriptionCurrent = response.data.weather[0].description;
      let humidityCurrent = response.data.main.humidity;
      let windCurrent = response.data.wind.speed;
      let pressureCurrent = response.data.main.pressure;
      let cityCurrent = response.data.name;
      city.innerHTML = `${cityCurrent}`;
      descriptionElement.innerHTML = `${descriptionCurrent}`;
      humidityElement.innerHTML = ` ${humidityCurrent}`;
      windElement.innerHTML = ` ${windCurrent}`;
      pressureElement.innerHTML = `${pressureCurrent}`;
    }
    axios.get(`${apiUrlCurrent}&units=metric`).then(showTemperatureCurrent);
  }

  navigator.geolocation.getCurrentPosition(findPosition);
}

let currentForm = document.querySelector("#current-city-btn");
currentForm.addEventListener("submit", currentsearch);

//the following code does not work but eventually will convert fahrenheit to celsius and vice versa:
let currentTemperatureFigure = document.querySelector(
  "#current-temperature-figure"
);
function showFahrenheit(event) {
  event.preventDefault();
  currentTemperatureFigure.innerHTML = `65`;
}

let fahrenheitButton = document.querySelector("#fahrenheit-btn");
fahrenheitButton.addEventListener("click", showFahrenheit);

/*
function showCelsius(event) {
  event.preventDefault();
  currentTemperatureFigure.innerHTML = "18";
  //this is where I need to change the code to read current temperature not 18
}


let celsiusButton = document.querySelector("#celsius-btn");
celsiusButton.addEventListener("click", showCelsius);
*/
