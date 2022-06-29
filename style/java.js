function formatDay() {
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = now.getDay();
  let days = week[day];
  let weekDay = days;
  return `${weekDay}`;
}
function formatDate() {
  let hours = now.getHours();
  if (hours < 10) {
    minutes = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes} `;
}
let now = new Date();
let dayToday = document.querySelector("#day_today");
dayToday.innerHTML = formatDay();
let timeNow = document.querySelector("#time_now");
timeNow.innerHTML = formatDate();

let apiKey = "7ad1bf417b741b444ec3593d62d14175";

function showTemp(response) {
  let tempCity = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#temp_now");
  tempNow.innerHTML = tempCity;
}
function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city_weather");
  let search = document.querySelector("input");
  let searchCity = search.value;
  city.innerHTML = searchCity;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
let form = document.querySelector("form");
form.addEventListener("submit", showCity);

function showCitiTemp(response) {
  let city = response.data.name;
  let cityNew = document.querySelector("#city_weather");
  cityNew.innerHTML = city;
  let tempCity = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#temp_now");
  tempNow.innerHTML = tempCity;
}

function showLocation() {
  function getLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrlBut = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrlBut).then(showCitiTemp);
  }
  navigator.geolocation.getCurrentPosition(getLocation);
}
let button = document.querySelector("button");
button.addEventListener("click", showLocation);
