import React, { useState } from "react";
// import axios from "axios";


function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const suggestion = {
    Clouds: "👟👖🥼🧥🥿",
    Clear: "👗👒👡🩳👕",
    Snow: "🥼🧣🧤👢🥾",
    Rain: "🧣🧤🥼👢🌂",
    Drizzle: "🧣🧤🥼👢🌂",
    Thunderstorm: "🧣🧤🥼👢🥾",
    "50d": "🧣🧤🥼👢🥾",
  };

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=290e1f7fae169142cb9f9dd175c51227`;

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      fetch(url)
      .then((res) => res.json())
      .then( json => {
        setData(json);
      } )
      setLocation("");
    }
  };

  return (
    <div className="app" id="app">
      <div className="search">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location"
          type="text"
          onKeyPress={searchLocation}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()} °F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <h1>{data.weather[0].main}</h1> : null}
          </div>
        </div>

        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()} °F</p>
              ) : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">{data.main.humidity} %</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}

        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              {suggestion[data.weather[0].main] ? (
                <h1> {suggestion[data.weather[0].main]}</h1>
              ) : (
                <h1>{suggestion[data.weather[0].icon]}</h1>
              )}

              {/* <p>Feels like</p> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
