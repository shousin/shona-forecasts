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

let city = document.querySelector("h1");
let apiKey = "cc6881d929e8ea4776abf51199d73643";
let humidityElement = document.querySelector("#current-humidity");
let descriptionElement = document.querySelector("#current-weather-text");
let windElement = document.querySelector("#current-wind");
let pressureElement = document.querySelector("#current-pressure");
let temperatureElement = document.querySelector("#current-temperature-figure");
let weatherSymbolElement = document.querySelector("#current-weather-symbol");
let searchForm = document.querySelector("#search-bar");
let localForm = document.querySelector("#local-city-btn");
let celsiusButton = document.querySelector("#celsius-btn");
let fahrenheitButton = document.querySelector("#fahrenheit-btn");
let isFahrenheitFunctionCalled = false;

celsiusButton.addEventListener("click", showCelsius);
fahrenheitButton.addEventListener("click", showFahrenheit);
searchForm.addEventListener("submit", search);
localForm.addEventListener("submit", localsearch);

//the following code converts fahrenheit to celsius and vice versa:

function showFahrenheit(event) {
  event.preventDefault();
  if (isFahrenheitFunctionCalled === false) {
    let celsiusFigure = Number(temperatureElement.innerHTML);
    let fahrenheitFigure = (celsiusFigure * 9) / 5 + 32;
    console.log(fahrenheitFigure);
    temperatureElement.innerHTML = Math.round(fahrenheitFigure);
    document.getElementById("fahrenheit-btn").style.opacity = "100%";
    document.getElementById("celsius-btn").style.opacity = "50%";
    isFahrenheitFunctionCalled = true;
  }
}

function showCelsius(event) {
  event.preventDefault();
  if (isFahrenheitFunctionCalled === true) {
    let fahrenheitFigure = Number(temperatureElement.innerHTML);
    let celsiusFigure = (fahrenheitFigure - 32) * (5 / 9);
    console.log(fahrenheitFigure);
    temperatureElement.innerHTML = Math.round(celsiusFigure);
    document.getElementById("celsius-btn").style.opacity = "100%";
    document.getElementById("fahrenheit-btn").style.opacity = "50%";
    isFahrenheitFunctionCalled = false;
  } else {
    isFahrenheitFunctionCalled = false;
  }
}

//there is a bug that means that if you click local and then search the temperature is wrong, and vice versa

//The following code reads the city from the search bar input and posts it on the page
//it also changes most of the data and colours for today to match that city
//more functions:
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar-input");
  let searchInputValueUpperCase = searchInput.value
    .toLowerCase()
    .replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });
  if (searchInputValueUpperCase) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInputValueUpperCase}&units=metric`;
    function showTemperature(response) {
      let icon = response.data.weather[0].icon;
      let temperature = Math.round(response.data.main.temp);
      let description = response.data.weather[0].description;
      let humidity = response.data.main.humidity;
      let wind = Math.round(response.data.wind.speed * 2.237);
      let pressure = response.data.main.pressure;

      temperatureElement.innerHTML = `${temperature}`;
      descriptionElement.innerHTML = `${description}`;
      humidityElement.innerHTML = ` ${humidity}`;
      windElement.innerHTML = ` ${wind}`;
      pressureElement.innerHTML = `${pressure}`;

      console.log(icon);
      if (icon === "03d" || icon === "04d") {
        weatherSymbolElement.innerHTML = "☁";
        document.getElementById("current-weather-text").style.color = "#fbc2eb";
        document.getElementById("current-weather-symbol").style.color =
          "#fbc2eb";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)";
      } else if (icon === "04n") {
        weatherSymbolElement.innerHTML = "☁";
        document.getElementById("current-weather-text").style.color = "#33354d";
        document.getElementById("current-weather-symbol").style.color =
          "#33354d";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(-20deg,  #0f0f0f 0%, #33354d 100%)";
      } else if (icon === "03n") {
        weatherSymbolElement.innerHTML = "☁";
        document.getElementById("current-weather-text").style.color = "#bac8e0";
        document.getElementById("current-weather-symbol").style.color =
          "#bac8e0";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to top, #6a85b6 0%, #23272e 100%)";
      } else if (icon === "02n") {
        weatherSymbolElement.innerHTML = "🌥";
        document.getElementById("current-weather-text").style.color = "#4403BC";
        document.getElementById("current-weather-symbol").style.color =
          "#4403BC";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to top, #a18cd1 0%, #2f2435 100%)";
      } else if (icon === "02d") {
        weatherSymbolElement.innerHTML = "🌥";
        document.getElementById("current-weather-text").style.color = "#fed6e3";
        document.getElementById("current-weather-symbol").style.color =
          "#fed6e3";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)";
      } else if (icon === "10d" || icon === "09d") {
        weatherSymbolElement.innerHTML = "🌧";
        document.getElementById("current-weather-text").style.color = "#ace0f9";
        document.getElementById("current-weather-symbol").style.color =
          "#ace0f9";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)";
      } else if (icon === "10n" || icon === "09n") {
        weatherSymbolElement.innerHTML = "🌧";
        document.getElementById("current-weather-text").style.color = "#495aff";
        document.getElementById("current-weather-symbol").style.color =
          "#495aff";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to right, #0acffe 0%, #495aff 100%)";
      } else if (icon === "11d") {
        weatherSymbolElement.innerHTML = "⛈";
        document.getElementById("current-weather-text").style.color = "#847B7B";
        document.getElementById("current-weather-symbol").style.color =
          "#847B7B";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898; background-blend-mode: multiply,multiply";
      } else if (icon === "13d") {
        weatherSymbolElement.innerHTML = "❄";
        document.getElementById("current-weather-text").style.color = "#eef1f5";
        document.getElementById("current-weather-symbol").style.color =
          "#eef1f5";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)";
      } else if (icon === "13n") {
        weatherSymbolElement.innerHTML = "❄";
        document.getElementById("current-weather-text").style.color = "#bcbcbc";
        document.getElementById("current-weather-symbol").style.color =
          "#bcbcbc";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)";
      } else if (icon === "01d") {
        weatherSymbolElement.innerHTML = "☀";
        document.getElementById("current-weather-text").style.color = "#f9d423";
        document.getElementById("current-weather-symbol").style.color =
          "#f9d423";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to right, #f83600 0%, #f9d423 100%)";
      } else if (icon === "01n") {
        weatherSymbolElement.innerHTML = "🌕";
        document.getElementById("current-weather-text").style.color = "#161513";
        document.getElementById("current-weather-symbol").style.color =
          "#161513";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to right, #243949 0%, #161513 100%)";
      } else if (icon === "50d") {
        weatherSymbolElement.innerHTML = "🌫";
        document.getElementById("current-weather-text").style.color = "#020f75";
        document.getElementById("current-weather-symbol").style.color =
          "#020f75";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to top, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #d4d4b1 71%, #0c1db8 87%, #020f75 100%)";
      } else if (icon === "50n") {
        weatherSymbolElement.innerHTML = "🌫";
        document.getElementById("current-weather-text").style.color = "#7046aa";
        document.getElementById("current-weather-symbol").style.color =
          "#7046aa";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #7046aa 100%)";
      } else {
        weatherSymbolElement.innerHTML = "⚙";
        document.getElementById("current-weather-text").style.color = "green";
        document.getElementById("current-weather-symbol").style.color = "green";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)";
      }
      if (response.data.weather[0].description) {
        city.innerHTML = searchInputValueUpperCase;
      }
    }
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  } else {
    city.innerHTML = `Please type a city...`;
  }
  document.getElementById("celsius-btn").style.opacity = "100%";
  document.getElementById("fahrenheit-btn").style.opacity = "50%";
  isFahrenheitFunctionCalled = false;
}

//the following code changes the data to that of the current location of the device
function localsearch(eventLocal) {
  eventLocal.preventDefault();
  function findPosition(position) {
    let latitude = `${position.coords.latitude}`;
    let longitude = `${position.coords.longitude}`;
    let apiUrlLocal = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    function showTemperatureLocal(response) {
      let icon = response.data.weather[0].icon;
      console.log(icon);
      let temperatureLocal = Math.round(response.data.main.temp);
      temperatureElement.innerHTML = `${temperatureLocal}`;
      let descriptionLocal = response.data.weather[0].description;
      let humidityLocal = response.data.main.humidity;
      let windLocal = Math.round(response.data.wind.speed * 2.237);
      let pressureLocal = response.data.main.pressure;
      let cityLocal = response.data.name;
      city.innerHTML = `${cityLocal}`;
      descriptionElement.innerHTML = `${descriptionLocal}`;
      humidityElement.innerHTML = ` ${humidityLocal}`;
      windElement.innerHTML = ` ${windLocal}`;
      pressureElement.innerHTML = `${pressureLocal}`;
      if (icon === "03d" || icon === "04d") {
        weatherSymbolElement.innerHTML = "☁";
        document.getElementById("current-weather-text").style.color = "#fbc2eb";
        document.getElementById("current-weather-symbol").style.color =
          "#fbc2eb";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)";
      } else if (icon === "04n") {
        weatherSymbolElement.innerHTML = "☁";
        document.getElementById("current-weather-text").style.color = "#9bc5c3";
        document.getElementById("current-weather-symbol").style.color =
          "#9bc5c3";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(-20deg,  #0f0f0f 0%, #33354d 100%)";
      } else if (icon === "03n") {
        weatherSymbolElement.innerHTML = "☁";
        document.getElementById("current-weather-text").style.color = "#bac8e0";
        document.getElementById("current-weather-symbol").style.color =
          "#bac8e0";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to top, #6a85b6 0%, #23272e 100%)";
      } else if (icon === "02n") {
        weatherSymbolElement.innerHTML = "🌥";
        document.getElementById("current-weather-text").style.color = "#fbc2eb";
        document.getElementById("current-weather-symbol").style.color =
          "#fbc2eb";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to top, #a18cd1 0%, #2f2435 100%)";
      } else if (icon === "02d") {
        weatherSymbolElement.innerHTML = "🌥";
        document.getElementById("current-weather-text").style.color = "#fed6e3";
        document.getElementById("current-weather-symbol").style.color =
          "#fed6e3";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)";
      } else if (icon === "10d" || icon === "09d") {
        weatherSymbolElement.innerHTML = "🌧";
        document.getElementById("current-weather-text").style.color = "#ace0f9";
        document.getElementById("current-weather-symbol").style.color =
          "#ace0f9";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)";
      } else if (icon === "10n" || icon === "09n") {
        weatherSymbolElement.innerHTML = "🌧";
        document.getElementById("current-weather-text").style.color = "#495aff";
        document.getElementById("current-weather-symbol").style.color =
          "#495aff";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to right, #0acffe 0%, #495aff 100%)";
      } else if (icon === "11d") {
        weatherSymbolElement.innerHTML = "⛈";
        document.getElementById("current-weather-text").style.color = "#847B7B";
        document.getElementById("current-weather-symbol").style.color =
          "#847B7B";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to top, #dbdcd7 0%, #dddcd7 24%, #e2c9cc 30%, #e7627d 46%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%)";
      } else if (icon === "13d") {
        weatherSymbolElement.innerHTML = "❄";
        document.getElementById("current-weather-text").style.color = "#eef1f5";
        document.getElementById("current-weather-symbol").style.color =
          "#eef1f5";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)";
      } else if (icon === "13n") {
        weatherSymbolElement.innerHTML = "❄";
        document.getElementById("current-weather-text").style.color = "#bcbcbc";
        document.getElementById("current-weather-symbol").style.color =
          "#bcbcbc";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)";
      } else if (icon === "01d") {
        weatherSymbolElement.innerHTML = "☀";
        document.getElementById("current-weather-text").style.color = "#ffa726";
        document.getElementById("current-weather-symbol").style.color =
          "#ffa726";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to right, #f83600 0%, #f9d423 100%)";
      } else if (icon === "01n") {
        weatherSymbolElement.innerHTML = "🌕";
        document.getElementById("current-weather-text").style.color = "#ffa726";
        document.getElementById("current-weather-symbol").style.color =
          "#ffa726";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to right, #243949 0%, #161513 100%)";
      } else if (icon === "50d") {
        weatherSymbolElement.innerHTML = "🌫";
        document.getElementById("current-weather-text").style.color = "#CEBB84";
        document.getElementById("current-weather-symbol").style.color =
          "#CEBB84";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to top, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #d4d4b1 71%, #0c1db8 87%, #020f75 100%)";
      } else if (icon === "50n") {
        weatherSymbolElement.innerHTML = "🌫";
        document.getElementById("current-weather-text").style.color = "#CEBB84";
        document.getElementById("current-weather-symbol").style.color =
          "#CEBB84";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #7046aa 100%)";
      } else {
        weatherSymbolElement.innerHTML = "⚙";
        document.getElementById("current-weather-text").style.color = "green";
        document.getElementById("current-weather-symbol").style.color = "green";
        document.getElementById("body").style.backgroundImage =
          "linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)";
      }
    }
    axios.get(`${apiUrlLocal}&units=metric`).then(showTemperatureLocal);
  }
  document.getElementById("celsius-btn").style.opacity = "100%";
  document.getElementById("fahrenheit-btn").style.opacity = "50%";
  navigator.geolocation.getCurrentPosition(findPosition);
  isFahrenheitFunctionCalled = false;
}

//still need to:
// fix precipitation (currently showing pressure)
// fix timezones
//do week's weather
// make current,local information the default upon loading the page
//make graphs work
//make weather descriptions capitalised
//work out how to merge current and search engine code

//notes from sheCodes:
//vanilla project html -
//1. make lists instead of divs (remember to put list-style: none; and margin:0;)
//2. Make signature <small> and rename github open-source code
//3. Add line-heights to things (line-height: 1; is the same as line-height: 64px; )
//4. replace container with div.weather-app-wrapper and put container outside all code
//5. make centigrade and fahrenheit small and up high using relative positioning (eg. top:-34px;)
//6. replace symbols with symbols from symbol website
