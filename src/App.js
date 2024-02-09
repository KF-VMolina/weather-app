import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=008f919e1d805ae61119ff91ac81b408`;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      try {
        const res = await axios.get(url);
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error("Location not found, try again"); // Display a toast notification for 404 error
        } else {
          toast.error("An error occurred, try again"); // Display a toast for any other errors
        }
      }
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter City..."
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}° C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}° C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} KM/H</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
