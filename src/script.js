function startPage() {
  let city = "denver, texas";
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

//the following code changes the data and formating of the page to match the weather icon in the chosen city
function showTemperature(response) {
  let icon = response.data.weather[0].icon;

  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed * 2.237);
  //I could not find precipiation on the OpenWeatherMap website so I have used pressure
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
  backgroundVideo.innerHTML = `<source src="Videos/${icon}.mp4" />`;
  backgroundVideo.pause();
  backgroundVideo.currentTime = 0;
  backgroundVideo.load();
  console.log(icon);
  document.getElementById("celsius-btn").style.opacity = "100%";
  document.getElementById("fahrenheit-btn").style.opacity = "50%";
  isFahrenheitFunctionCalled = false;
  //the following code changes the background colour and icon depending on the weather
  let sigColor = "000000";
  let bkgrdColor1 = "#";
  //clear sky day <
  if (icon === "01d") {
    bkgrdColor1 = "f9d423";
    //clear sky night !
  } else if (icon === "01n") {
    sigColor = "ffffff";
    bkgrdColor1 = "161513";
    //few clouds day !
  } else if (icon === "02d") {
    bkgrdColor1 = "EA7A5C";
    //few clouds night !
  } else if (icon === "02n") {
    sigColor = "ffffff";
    bkgrdColor1 = "4403BC";
    // scattered clouds day !
  } else if (icon === "03d") {
    bkgrdColor1 = "a18cd1";
    // scattered clouds night !
  } else if (icon === "03n") {
    sigColor = "ffffff";
    bkgrdColor1 = "6a85b6";
    //broken clouds day !
  } else if (icon === "04d") {
    bkgrdColor1 = "a18cd1";
    //broken clouds night ! - bit grainy
  } else if (icon === "04n") {
    sigColor = "ffffff";
    bkgrdColor1 = "33354d";
    //rain day !
  } else if (icon === "09d") {
    bkgrdColor1 = "ace0f9";
    //rain night !
  } else if (icon === "09n") {
    sigColor = "ffffff";
    bkgrdColor1 = "32136B";
    //drizzle day !
  } else if (icon === "10d") {
    bkgrdColor1 = "ace0f9";
    //drizzle night !
  } else if (icon === "10n") {
    sigColor = "ffffff";
    bkgrdColor1 = "32136B";
    //storm day !
  } else if (icon === "11d") {
    sigColor = "ffffff";
    bkgrdColor1 = "b8235a";
    //storm night !
  } else if (icon === "11n") {
    sigColor = "ffffff";
    bkgrdColor1 = "b8235a";
    //snow day !
  } else if (icon === "13d") {
    bkgrdColor1 = "eef1f5";
    //snow night !
  } else if (icon === "13n") {
    sigColor = "ffffff";
    bkgrdColor1 = "bcbcbc";
    //mist day !
  } else if (icon === "50d") {
    bkgrdColor1 = "020f75";
    //mist night !
  } else if (icon === "50n") {
    sigColor = "ffffff";
    bkgrdColor1 = "7046aa";
  } else {
    bkgrdColor1 = "eea2a2";
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
let backgroundVideo = document.getElementById("background-video");

celsiusButton.addEventListener("click", showCelsius);
fahrenheitButton.addEventListener("click", showFahrenheit);
searchForm.addEventListener("submit", search);
localForm.addEventListener("submit", localsearch);

startPage();

//still need to:
//add different videos to diversify bsckgronud options
// fix timezones - API is wrong not me
// make it so mobile version gets an image or gradient  instead of a video
// https://ecstatic-bose-fe1b46.netlify.app/
