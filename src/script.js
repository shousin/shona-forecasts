//The following code sets the day and time:

function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecast = null;
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    icon = forecast.weather[0].icon;
    let forecastSymbol = "symbol";
    if (icon === "03d" || icon === "04d" || icon === "04n" || icon === "03n") {
      forecastSymbol = "☁";
    } else if (icon === "02n" || icon === "02d") {
      forecastSymbol = "🌥";
    } else if (
      icon === "10d" ||
      icon === "09d" ||
      icon === "10n" ||
      icon === "09n"
    ) {
      forecastSymbol = "🌧";
    } else if (icon === "11d" || icon === "11n") {
      forecastSymbol = "⛈";
    } else if (icon === "13d" || icon === "13n") {
      forecastSymbol = "❄";
    } else if (icon === "01d") {
      forecastSymbol = "☀";
    } else if (icon === "01n") {
      forecastSymbol = "🌕";
    } else if (icon === "50d" || icon === "50n") {
      forecastSymbol = "🌫";
    } else {
      forecastSymbol = "⚙";
    }
    //the += below means it goes through the "for loop" defined above, 1 by 1 and it posts it next to the previous innerHTMl
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3 class="center">${formatHours(forecast.dt * 1000)}</h3>
      <div>
      ${forecastSymbol}
      </div>
      <div class="center"> 
      <strong> ${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(
      forecast.main.temp_min
    )}°
    </div>
    </div>
  `;
  }
}
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

//The following code reads the city from the search bar input and posts it on the page

function search(event) {
  event.preventDefault();
  city = document.querySelector("#search-bar-input");
  city = city.value.toLowerCase().replace(/\b[a-z]/g, function (letter) {
    return letter.toUpperCase();
  });
  if (city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
    //the following code is to forecast weather
    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(displayForecast);
    //the following code changed the css of the degrees buttons
  } else {
    cityShown.innerHTML = "Please enter a city...";
  }
}
//the following codes the local button
function localsearch(eventLocal) {
  eventLocal.preventDefault();
  function findPosition(position) {
    let latitude = `${position.coords.latitude}`;
    let longitude = `${position.coords.longitude}`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    axios.get(`${apiUrl}&units=metric`).then(showTemperature);
    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    axios.get(`${apiUrl}&units=metric`).then(displayForecast);
  }
  navigator.geolocation.getCurrentPosition(findPosition);
}

function showTemperature(response) {
  let icon = response.data.weather[0].icon;
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed * 2.237);
  let pressure = response.data.main.pressure;
  city = response.data.name;
  cityShown.innerHTML = city;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  temperatureElement.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = `${description}`;
  humidityElement.innerHTML = ` ${humidity}`;
  windElement.innerHTML = ` ${wind}`;
  pressureElement.innerHTML = `${pressure}`;
  document.getElementById("celsius-btn").style.opacity = "100%";
  document.getElementById("fahrenheit-btn").style.opacity = "50%";
  isFahrenheitFunctionCalled = false;
  //the following code changes the background colour and icon depending on the weather
  if (icon === "03d" || icon === "04d") {
    weatherSymbolElement.innerHTML = "☁";
    document.getElementById("current-weather-text").style.color = "#fbc2eb";
    document.getElementById("current-weather-symbol").style.color = "#fbc2eb";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)";
  } else if (icon === "04n") {
    weatherSymbolElement.innerHTML = "☁";
    document.getElementById("current-weather-text").style.color = "#33354d";
    document.getElementById("current-weather-symbol").style.color = "#33354d";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(-20deg,  #0f0f0f 0%, #33354d 100%)";
  } else if (icon === "03n") {
    weatherSymbolElement.innerHTML = "☁";
    document.getElementById("current-weather-text").style.color = "#bac8e0";
    document.getElementById("current-weather-symbol").style.color = "#bac8e0";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to top, #6a85b6 0%, #23272e 100%)";
  } else if (icon === "02n") {
    weatherSymbolElement.innerHTML = "🌥";
    document.getElementById("current-weather-text").style.color = "#4403BC";
    document.getElementById("current-weather-symbol").style.color = "#4403BC";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to top, #a18cd1 0%, #2f2435 100%)";
  } else if (icon === "02d") {
    weatherSymbolElement.innerHTML = "🌥";
    document.getElementById("current-weather-text").style.color = "#fed6e3";
    document.getElementById("current-weather-symbol").style.color = "#fed6e3";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)";
  } else if (icon === "10d" || icon === "09d") {
    weatherSymbolElement.innerHTML = "🌧";
    document.getElementById("current-weather-text").style.color = "#ace0f9";
    document.getElementById("current-weather-symbol").style.color = "#ace0f9";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)";
  } else if (icon === "10n" || icon === "09n") {
    weatherSymbolElement.innerHTML = "🌧";
    document.getElementById("current-weather-text").style.color = "#495aff";
    document.getElementById("current-weather-symbol").style.color = "#495aff";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to right, #0acffe 0%, #495aff 100%)";
  } else if (icon === "11d" || icon === "11n") {
    weatherSymbolElement.innerHTML = "⛈";
    document.getElementById("current-weather-text").style.color = "#b8235a";
    document.getElementById("current-weather-symbol").style.color = "#b8235a";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to top, #dbdcd7 0%, #dddcd7 24%, #e2c9cc 30%, #e7627d 46%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%)";
  } else if (icon === "13d") {
    weatherSymbolElement.innerHTML = "❄";
    document.getElementById("current-weather-text").style.color = "#eef1f5";
    document.getElementById("current-weather-symbol").style.color = "#eef1f5";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)";
  } else if (icon === "13n") {
    weatherSymbolElement.innerHTML = "❄";
    document.getElementById("current-weather-text").style.color = "#bcbcbc";
    document.getElementById("current-weather-symbol").style.color = "#bcbcbc";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)";
  } else if (icon === "01d") {
    weatherSymbolElement.innerHTML = "☀";
    document.getElementById("current-weather-text").style.color = "#f9d423";
    document.getElementById("current-weather-symbol").style.color = "#f9d423";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to right, #f83600 0%, #f9d423 100%)";
  } else if (icon === "01n") {
    weatherSymbolElement.innerHTML = "🌕";
    document.getElementById("current-weather-text").style.color = "#161513";
    document.getElementById("current-weather-symbol").style.color = "#161513";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to right, #243949 0%, #161513 100%)";
  } else if (icon === "50d") {
    weatherSymbolElement.innerHTML = "🌫";
    document.getElementById("current-weather-text").style.color = "#020f75";
    document.getElementById("current-weather-symbol").style.color = "#020f75";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to top, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #d4d4b1 71%, #0c1db8 87%, #020f75 100%)";
  } else if (icon === "50n") {
    weatherSymbolElement.innerHTML = "🌫";
    document.getElementById("current-weather-text").style.color = "#7046aa";
    document.getElementById("current-weather-symbol").style.color = "#7046aa";
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

//variables and event listeners
let cityShown = document.querySelector("h1");
let apiKey = "cc6881d929e8ea4776abf51199d73643";
let humidityElement = document.querySelector("#current-humidity");
let descriptionElement = document.querySelector("#current-weather-text");
let windElement = document.querySelector("#current-wind");
let pressureElement = document.querySelector("#current-pressure");
let temperatureElement = document.querySelector("#current-temperature-figure");
let weatherSymbolElement = document.querySelector("#current-weather-symbol");
let searchForm = document.querySelector("#search-bar");
let localForm = document.querySelector("#local-city-btn");
let dateElement = document.querySelector("#current-day-and-time");
let celsiusButton = document.querySelector("#celsius-btn");
let fahrenheitButton = document.querySelector("#fahrenheit-btn");
let isFahrenheitFunctionCalled = false;

celsiusButton.addEventListener("click", showCelsius);
fahrenheitButton.addEventListener("click", showFahrenheit);
searchForm.addEventListener("submit", search);
localForm.addEventListener("submit", localsearch);

// the following code is a list of personalised icons because the openweather ones won't work

//

//still need to:
// fix timezones
//make weather descriptions capitalised
//make an index of weather icon codes and put own images in

//notes from sheCodes:
//vanilla project html -
//3. Add line-heights to things (line-height: 1; is the same as line-height: 64px; )
//4. replace container with div.weather-app-wrapper and put container outside all code
//6. replace symbols with symbols from symbol website - tried and doesnt work
