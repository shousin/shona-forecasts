function startPage() {
  let city = "London";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  //the following code is to forecast weather
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayForecast);
}

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
    description = forecast.weather[0].description;
    if (description === "clear sky") {
      description = "clear<br>sky";
    }
    //the += below means it goes through the "for loop" defined above, 1 by 1 and it posts it next to the previous innerHTMl
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3 class="center" id = "hours">${formatHours(forecast.dt * 1000)}</h3>
      <img class = "icons" id = "icons"
      src="https://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" alt="${description}"
      />
      <br>
      <small> ${description} </small>
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
//I wrote the following code without help from the videos so it might look quite different from what you are expecting
function showFahrenheit(event) {
  event.preventDefault();
  if (isFahrenheitFunctionCalled === false) {
    let celsiusFigure = Number(temperatureElement.innerHTML);
    let fahrenheitFigure = (celsiusFigure * 9) / 5 + 32;
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

//the following code changes the data and formating of the page to match the weather in the chosen city
function showTemperature(response) {
  let icon = response.data.weather[0].icon;
  console.log(icon);
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed * 2.237);
  let pressure = response.data.main.pressure;
  description = description
    .toLowerCase()
    .replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });
  city = response.data.name;
  cityShown.innerHTML = city;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  temperatureElement.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = `${description}`;
  humidityElement.innerHTML = ` ${humidity}`;
  windElement.innerHTML = ` ${wind}`;
  pressureElement.innerHTML = `${pressure}`;
  weatherSymbolElement.innerHTML = `<img
      src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}"
      />`;
  document.getElementById("celsius-btn").style.opacity = "100%";
  document.getElementById("fahrenheit-btn").style.opacity = "50%";
  isFahrenheitFunctionCalled = false;
  //the following code changes the background colour and icon depending on the weather
  let sigColor = "#";
  let bkgrdColor1 = "#";
  if (icon === "01d") {
    sigColor = "000000";
    bkgrdColor1 = "f9d423";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to right, #f83600 0%, #f9d423 100%)";
  } else if (icon === "01n") {
    sigColor = "ffffff";
    bkgrdColor1 = "161513";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to right, #243949 0%, #161513 100%)";
  } else if (icon === "02d") {
    sigColor = "000000";
    bkgrdColor1 = "EA7A5C";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to top, #E8F2AB 0%, #EA7A5C 100%)";
  } else if (icon === "02n") {
    sigColor = "ffffff";
    bkgrdColor1 = "4403BC";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to top, #a18cd1 0%, #2f2435 100%)";
  } else if (icon === "03d" || icon === "04d") {
    sigColor = "000000";
    bkgrdColor1 = "a18cd1";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)";
  } else if (icon === "03n") {
    sigColor = "ffffff";
    bkgrdColor1 = "6a85b6";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to top, #6a85b6 0%, #23272e 100%)";
  } else if (icon === "04n") {
    sigColor = "ffffff";
    bkgrdColor1 = "33354d";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(-20deg,  #0f0f0f 0%, #33354d 100%)";
  } else if (icon === "09d" || icon === "10d") {
    sigColor = "000000";
    bkgrdColor1 = "ace0f9";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)";
  } else if (icon === "09n" || icon === "10n") {
    sigColor = "ffffff";
    bkgrdColor1 = "32136B";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to right, #32136B 0%, #495aff 100%)";
  } else if (icon === "11d" || icon === "11n") {
    sigColor = "ffffff";
    bkgrdColor1 = "b8235a";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to top, #dbdcd7 0%, #dddcd7 24%, #e2c9cc 30%, #e7627d 46%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%)";
  } else if (icon === "13d") {
    sigColor = "000000";
    bkgrdColor1 = "eef1f5";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)";
  } else if (icon === "13n") {
    sigColor = "ffffff";
    bkgrdColor1 = "bcbcbc";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)";
  } else if (icon === "50d") {
    sigColor = "000000";
    bkgrdColor1 = "020f75";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to top, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #d4d4b1 71%, #0c1db8 87%, #020f75 100%)";
  } else if (icon === "50n") {
    sigColor = "ffffff";
    bkgrdColor1 = "7046aa";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #7046aa 100%)";
  } else {
    sigColor = "000000";
    bkgrdColor1 = "eea2a2";
    document.getElementById("body").style.backgroundImage =
      "linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)";
  }
  document.getElementById("signature").style.color = `#${sigColor}`;
  document.getElementById(
    "current-day-and-time"
  ).style.color = `#${bkgrdColor1}`;
  document.getElementById(
    "current-weather-text"
  ).style.color = `#${bkgrdColor1}`;
  document.getElementById(
    "current-weather-symbol"
  ).style.color = `#${bkgrdColor1}`;
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

startPage();

//still need to:
//decide what to do with pressure - convert it??
// fix timezones - API is wrong not me
//Add line-heights to things (line-height: 1; is the same as line-height: 64px; )
