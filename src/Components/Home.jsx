import React, { useState } from 'react'
import { Container, Row, Col, Card, Spinner, Form, Button, InputGroup } from "react-bootstrap";
import { useLayoutContext } from '../Context/context';
import { FaSearch, FaTint, FaWind } from "react-icons/fa";
import { getWeatherIcon } from "../utils/weatherIcons";
import WeatherMap from "./WeatherMap";

function Home() {
  const { weather,loading, fetchWeather,city,setCity } = useLayoutContext();

  const weatherMain = weather?.weather?.[0]?.main ?? "";
  const iconCode = weather?.weather?.[0]?.icon ?? "01d";
  const isDay = iconCode.includes("d");
  const WeatherIconComponent = getWeatherIcon(weatherMain, isDay);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
    <Card className="glass-card p-4 text-center" style={{ width: "320px", borderRadius: "20px" }}>
      {/* سرچ بار */}
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-4">
          <Form.Control
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className=" rounded-pill"
          />
          <Button type="submit" variant="light" className="ms-2 rounded-pill">
            <FaSearch/>
          </Button>
        </InputGroup>
      </Form>
      {weather && (
        <>
        <WeatherIconComponent size={100} className="d-block mx-auto" color={isDay ? "#f39c12" : "#3498db"} />
          <h4 className="nav-link-custom fw-bold mb-1 mt-2">{weather.name}</h4>
          <h5 className="font fw-bold mb-3">{weather.main.temp} °C</h5>
          <p className="font text-capitalize">{weather.weather[0].description}</p>
          <div className="d-flex justify-content-around mt-3">
            <div className="text-center">
              <FaTint size={20} />
              <p className="mb-0">{weather.main.humidity}%</p>
              <small className='font'>Humidity</small>
            </div>
            <div className="text-center">
              <FaWind size={20} />
              <p className="mb-0">{weather.wind.speed} m/s</p>
              <small className='font'>Wind</small>
            </div>
          </div>
        </>
      )}
    </Card>
    {weather?.coord && (
        <div className="mt-4" style={{ width: "430px", borderRadius: "12px", overflow: "hidden",paddingLeft:'100px' }}>
          <WeatherMap lat={weather.coord.lat} lon={weather.coord.lon} city={weather.name} />
        </div>
      )}
  </div>
);
};
export default Home