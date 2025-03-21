import React, { useState, useEffect } from "react";
import "./Project.css";

function Project() {
  let [Hour, setHour] = useState();
  let [Min, setMin] = useState();
  let [Pm, setPm] = useState("");
  let [Day, setDay] = useState("");
  let [Know, setKnow] = useState({ date: null, month: null, year: null });
  let [city, setCity] = useState("");
  let [Gweather, setWeather] = useState("");

  //Time function
  const time = () => {
    setHour((Hour = new Date().getHours()));
    setMin((Min = new Date().getMinutes()));

    //Deciding am || pm
    Hour > 11 ? setPm((Pm = "PM")) : setPm((Pm = "AM"));

    //Converting 24 clock to 12
    Hour === 0 ? setHour((Hour = 12)) : setHour(Hour);
    Hour > 12 ? setHour((Hour -= 12)) : setHour(Hour);
    Hour < 10 ? setHour("0" + Hour) : setHour(Hour);
    Min < 10 ? setMin("0" + Min) : setMin(Min);

    //Setting Day
    const weekDay = new Date().getDay();
    const week = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thrusday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    setDay(weekDay === 0 ? (Day = week[6]) : (Day = week[weekDay - 1]));

    //Setting Date, Month and year
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    setKnow({
      date: new Date().getDate(),
      month: months[new Date().getMonth()],
      year: Number(String(new Date().getFullYear()).slice(2, 4)),
    });
  };

  //Running Time
  useEffect(() => {
    const interval = setInterval(time, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  //Fetching weather from api with current location
  useEffect(() => {
    const success = (position) => {
      const Latitude = position.coords.latitude;
      const Longitude = position.coords.longitude;
      let api_key = "47ee6a51cc8cfa86163ab8b258256f3c";
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&appid=${api_key}`
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          const temp = document.querySelector("#temp");
          const city = document.querySelector("#city");
          const weather = document.querySelector("#weather");
          const weatherIcon = document.querySelector("#weather-icon");
          const feelsLike = document.querySelector("#temp-feels");
          const cloudy = document.querySelector("#cloudy");
          const humidity = document.querySelector("#humidity");
          const wind = document.querySelector("#wind");
          const rain = document.querySelector("#rain");
          const img = document.querySelector("#img");

          //Setting Temperature
          temp.innerText = (res.main.temp - 273.15).toFixed(0) + "°";

          //Setting City
          city.innerText = res.name;

          //Setting Weather Description
          for (const i of res.weather) {
            setWeather((Gweather = i.main));
            weather.innerText = i.main === "Clear" ? "Sunny" : i.main;
          }

          //Setting Weather Icon
          switch (weather.innerText) {
            case "Sunny":
              weatherIcon.innerText = "light_mode";
              break;
            case "Clouds":
              weatherIcon.innerText = "cloud";
              break;
            case "Rain":
              weatherIcon.innerText = "rainy";
              break;
            default:
              weatherIcon.innerText = "cloud";
              break;
          }

          //Setting Feels Like Temperature
          feelsLike.innerText = (res.main.feels_like - 273.15).toFixed(1) + "°";

          //Setting Cloudiness
          cloudy.innerText = res.clouds.all + "%";

          //Setting Humidity
          humidity.innerText = res.main.humidity + "%";

          //Setting Wind
          wind.innerText =
            ((res.wind.speed / 1000) * 60 * 60).toFixed(0) + "Km/h";

          //Setting Rain
          rain.innerText = res.rain
            ? res.rain["1h"].toFixed(0) + "mm"
            : 0 + "mm";

          //Changing img
          Gweather === "Clouds"
            ? (img.style.display = "none")
            : Gweather === "Clear"
            ? (img.style.display = "block ")
            : (img.style.display = "none");
        });
    };

    //Error message
    const error = () => {
      console.log("Could not retrive your location");
    };

    //Fetching Current Position
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  //Displaying Searched City's Weather
  const fetchData = () => {
    const api_key = "47ee6a51cc8cfa86163ab8b258256f3c";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.message) {
          alert("Weather not available for current city");
        } else {
          const temp = document.querySelector("#temp");
          const city = document.querySelector("#city");
          const weather = document.querySelector("#weather");
          const weatherIcon = document.querySelector("#weather-icon");
          const feelsLike = document.querySelector("#temp-feels");
          const cloudy = document.querySelector("#cloudy");
          const humidity = document.querySelector("#humidity");
          const wind = document.querySelector("#wind");
          const rain = document.querySelector("#rain");
          const img = document.querySelector("#img");

          //Setting Temperature
          temp.innerText = (res.main.temp - 273.15).toFixed(0) + "°";

          //Setting City
          city.innerText = res.name;

          //Setting Weather Description
          for (const i of res.weather) {
            setWeather((Gweather = i.main));
            weather.innerText = i.main === "Clear" ? "Sunny" : i.main;
          }

          //Setting Weather Icon
          switch (weather.innerText) {
            case "Sunny":
              weatherIcon.innerText = "light_mode";
              break;
            case "Clouds":
              weatherIcon.innerText = "cloud";
              break;
            case "Rain":
              weatherIcon.innerText = "rainy";
              break;
            default:
              weatherIcon.innerText = "cloud";
              break;
          }

          //Setting Feels Like Temperature
          feelsLike.innerText = (res.main.feels_like - 273.15).toFixed(1) + "°";

          //Setting Cloudiness
          cloudy.innerText = res.clouds.all + "%";

          //Setting Humidity
          humidity.innerText = res.main.humidity + "%";

          //Setting Wind
          wind.innerText =
            ((res.wind.speed / 1000) * 60 * 60).toFixed(0) + "Km/h";

          //Setting Rain
          rain.innerText = res.rain
            ? res.rain["1h"].toFixed(1) + "mm"
            : 0 + "mm";

          //Changing img
          Gweather === "Clouds"
            ? (img.style.display = "none")
            : Gweather === "Clear"
            ? (img.style.display = "block")
            : (img.style.display = "none");
        }
      });
    setCity((city = ""));
  };

  return (
    <div
      className={
        Gweather === "Clear"
          ? "body_sunny"
          : Gweather === "Rain"
          ? "body_rain"
          : "body_clouds"
      }
    >
      <div className="main">
        <div
          className={
            Gweather === "Clear"
              ? "content_sunny"
              : Gweather === "Rain"
              ? "content_rain"
              : "content_clouds"
          }
        >
          <div className="content-text">
            <span id="temp">26°</span>
            <div className="content-subtext">
              <p id="city">London</p>
              <span>
                {Day}, {Know.date}
                {Know.month}'{Know.year}
              </span>
            </div>
            <div className="subtext-img">
              <span id="weather-icon" className="material-symbols-outlined">
                sunny
              </span>
              <span id="weather">Sunny</span>
            </div>
          </div>
          <div className="img">
            <img
              id="img"
              src="https://i.pinimg.com/originals/9b/f2/32/9bf232b4fb79227435a711f7daa75926.png"
              alt="air_balloon"
            />
          </div>
        </div>
        <div
          className={
            Gweather === "Clear"
              ? "side-bar_sunny"
              : Gweather === "Rain"
              ? "side-bar_rain"
              : "side-bar_clouds"
          }
        >
          <div className="blur">
            <span className="time">
              {Hour}
              <span>:</span>
              {Min}
              {Pm}
            </span>
            <div className="search-bar">
              <input
                value={city}
                onChange={(e) => setCity((city = e.target.value))}
                type="text"
                placeholder="Another city"
              />
              <button
                className={
                  Gweather === "Clear"
                    ? "button_sunny"
                    : Gweather === "Rain"
                    ? "button_rain"
                    : "button_clouds"
                }
                onClick={fetchData}
              >
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
            <div className="weather-details">
              <h3>Weather Details</h3>
              <div className="details">
                <span className="attributes">Feels Like</span>
                <span id="temp-feels">41</span>
              </div>
              <div className="details">
                <span className="attributes">Cloudy</span>
                <span id="cloudy">2%</span>
              </div>
              <div className="details">
                <span className="attributes">Humidity</span>
                <span id="humidity">12%</span>
              </div>
              <div className="details">
                <span className="attributes">Wind</span>
                <span id="wind">2Km/h</span>
              </div>
              <div className="details">
                <span className="attributes">Rain</span>
                <span id="rain">0mm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
