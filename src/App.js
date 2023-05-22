
import React, { useState } from "react";
import axios from "axios";
import hotImage from "./assets/hot.jpg";
import rainImage from "./assets/cold.jpg";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=78088675cd77949027551735b4394a04&lang=he`;

  const searchLocation = async (event) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      console.log(response.data);
      setLocation("");
    } catch (error) {
      if (error) {
        setData({ error: "City not found" });
        console.log("City not found");
      }
    }
  };

  const handleClear = () => {
    setData("");
  };

  let backgroundImage;
  if (data.main && data.main.temp > 30) {
    backgroundImage = hotImage;
  } else if (data.main && data.main.temp < 18) {
    backgroundImage = rainImage;
  } else {
    backgroundImage = null; 
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Search Location"
          type="text"
        />
        <button className="SearchButton" onClick={searchLocation}>
          search
        </button>
        <button className="button" onClick={handleClear}>
          Clear
        </button>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>{data.main.temp.toFixed()}°C</h1>
            ) : (
              <h2>{data.error}</h2>
            )}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
