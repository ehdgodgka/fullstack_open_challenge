import React, { useState, useEffect } from "react";
import "./Content.css";
import axios from "axios";
const Weather = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState({});
  useEffect(() => {
    console.log("weather request");
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${country.capital},${country.name}`
      )
      .then((response) => {
        setWeatherInfo(response.data.current);
      });
  }, [country]);

  return (
    <>
      <h2>weather in {country.capital} </h2>
      <ul className='deco-none-list'>
        <li> temparature: {weatherInfo.temperature}</li>
        <li>
          <img src={weatherInfo.weather_icons} />
        </li>
        <li>
          wind: {weatherInfo.wind_speed}mph direction{weatherInfo.wind_dir}
        </li>
      </ul>
    </>
  );
};

const Content = ({ items, showItem }) => {
  const showCountry = (event) => {
    const countryName = event.target.parentElement.querySelector("span").textContent;

    showItem(countryName);
  };
  if (items.length > 10) {
    return <div> Too many Matches, specify filter</div>;
  } else if (items.length > 1 && items.length < 10) {
    return (
      <div>
        {items.map((item) => (
          <li key={item.name}>
            <span>{item.name}</span> <button onClick={showCountry}>show</button>
          </li>
        ))}
      </div>
    );
  } else if (items.length === 1) {
    const { name, capital, population, languages } = items[0];
    return (
      <div className=' country-info'>
        <h1>{name}</h1>
        <ul className='deco-none-list basic-info'>
          <li>capital:{capital}</li>
          <li>population:{population}</li>
        </ul>
        <h2>Language</h2>
        <ul>
          {languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <h2>Flag</h2>
        <img className='flag' src={items[0].flag} />
        <Weather country={items[0]} />
      </div>
    );
  } else {
    return null;
  }
};

export default Content;
