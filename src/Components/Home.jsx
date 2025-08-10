import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useLayoutContext } from "../Context/context";
import { FaSearch, FaTint, FaWind } from "react-icons/fa";
import { getWeatherIcon } from "../utils/weatherIcons";
import { MdDelete, MdEdit } from "react-icons/md";
import WeatherMap from "./WeatherMap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const {
    weather,
    loading,
    fetchWeather,
    city,
    setCity,
    forecast,
    fetchForecastWeather,
  } = useLayoutContext();

  const [notes, setNotes] = useState("");
  const [savedNote, setSavedNote] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [forecastNotes, setForecastNotes] = useState({});
  const [forecastNoteInput, setForecastNoteInput] = useState({});

  const handleSaveNote = () => {
    setSavedNote(notes);
    setEditMode(false);
  };

  const handleDeleteNote = () => {
    setSavedNote(null);
    setNotes("");
  };

  const handleEditNote = () => {
    setEditMode(true);
  };

  const handleForecastNoteChange = (index, value) => {
    const newNotes = [...forecastNotes];
    newNotes[index] = value;
    setForecastNotes(newNotes);
  };

  const getCurrentAlerts = (weather) => {
    const alerts = [];

    if (weather?.main?.temp < 0) {
      alerts.push("❄️ Temperature below zero degrees");
    }

    const desc = weather?.weather?.[0]?.main?.toLowerCase() || "";

    if (desc.includes("rain")) {
      alerts.push("🌧️ Chance of Rain!");
    }

    if (desc.includes("snow")) {
      alerts.push("🌨️ Chance of Snow ");
    }

    if (weather?.wind?.speed > 10) {
      alerts.push("💨  Strong Wind !");
    }

    return alerts;
  };

  const getForecastAlerts = (day) => {
    const alerts = [];

    if (day.main.temp < 0) {
      alerts.push("❄️ Temperature below zero degrees");
    }

    const desc = day.weather[0].main.toLowerCase();

    if (desc.includes("rain")) {
      alerts.push("🌧️ Chance of Rain!");
    }

    if (desc.includes("snow")) {
      alerts.push("🌨️ Chance of Snow ");
    }

    if (day.wind.speed > 10) {
      alerts.push("💨 Strong Wind !");
    }

    return alerts;
  };

  const weatherMain = weather?.weather?.[0]?.main ?? "";
  const iconCode = weather?.weather?.[0]?.icon ?? "01d";
  const isDay = iconCode.includes("d");
  const WeatherIconComponent = getWeatherIcon(weatherMain, isDay);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchForecastWeather();
  };

  return (
    <Container className="mt-5">
      {/* ردیف کارت و نقشه */}
      <Row className="justify-content-center">
        <Col xs="auto">
          <Card
            className="glass-card p-4 text-center"
            style={{ width: "320px", borderRadius: "20px" }}
          >
            <Form onSubmit={handleSubmit}>
              <InputGroup className="mb-4">
                <Form.Control
                  type="text"
                  placeholder="Search city..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="rounded-pill"
                />
                <Button
                  type="submit"
                  variant="light"
                  className="ms-2 rounded-pill"
                >
                  <FaSearch />
                </Button>
              </InputGroup>
            </Form>

            {weather && (
              <>
                <WeatherIconComponent
                  size={100}
                  className="d-block mx-auto"
                  color={isDay ? "#f39c12" : "#3498db"}
                />
                <h4 className="nav-link-custom fw-bold mb-1 mt-2">
                  {weather.name}
                </h4>
                <h5 className="font fw-bold mb-3">{weather.main.temp} °C</h5>
                <p className="font text-capitalize">
                  {weather.weather[0].description}
                </p>
                <div className="d-flex justify-content-around mt-3">
                  <div className="text-center">
                    <FaTint size={20} />
                    <p className="mb-0">{weather.main.humidity}%</p>
                    <small className="font">Humidity</small>
                  </div>
                  <div className="text-center">
                    <FaWind size={20} />
                    <p className="mb-0">{weather.wind.speed} m/s</p>
                    <small className="font">Wind</small>
                  </div>
                </div>
                <div className="mt-4 text-start">
                  <h6 className="fw-bold">یادداشت‌ها:</h6>
                  {editMode ? (
                    <>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="mb-2"
                      />
                      <Button
                        variant="success"
                        size="sm"
                        onClick={handleSaveNote}
                        className="me-2"
                      >
                        ثبت
                      </Button>
                    </>
                  ) : savedNote ? (
                    <div className="d-flex justify-content-between align-items-start">
                      <p className="mb-1">{savedNote}</p>
                      <div>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={handleEditNote}
                          className="me-2"
                        >
                          <MdEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={handleDeleteNote}
                        >
                          <MdDelete />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => setEditMode(true)}
                    >
                      افزودن یادداشت
                    </Button>
                  )}
                </div>
                {getCurrentAlerts(weather).length > 0 && (
                  <div className="mt-4 text-danger small text-start">
                    <strong>⚠️ Current Alert:</strong>
                    <ul className="ps-3 mb-0">
                      {getCurrentAlerts(weather).map((alert, index) => (
                        <li key={index}>{alert}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </Card>
        </Col>

        {/* نقشه در کنار کارت */}
        {weather?.coord && (
          <Col xs="auto">
            <div
              style={{
                width: "430px",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <WeatherMap
                lat={weather.coord.lat}
                lon={weather.coord.lon}
                city={weather.name}
              />
            </div>
          </Col>
        )}
      </Row>

      {/* اسلایدر پیش‌بینی زیر کارت و نقشه */}
      {forecast.length > 0 && (
        <Row className="justify-content-center mt-5">
          <Col md={10}>
            <div className="text-center">
              <h5 className="fontcast fw-bold">5-Day Forecast</h5>
              <div className="forecast-slider mt-3 d-flex overflow-auto">
                {forecast.map((day, index) => {
                  const notes = forecastNotes[index] || [];
                  return (
                    <div
                      key={index}
                      className="forecast-card glass-card mx-2 p-3 text-center"
                      style={{ minWidth: "200px" }}
                    >
                      <small className="fw-bold">
                        {new Date(day.dt_txt).toLocaleDateString()}
                      </small>
                      <img
                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        alt={day.weather[0].description}
                        style={{ width: "60px", height: "60px" }}
                      />
                      <p className="mb-0">{Math.round(day.main.temp)} °C</p>
                      <small className="text-capitalize">
                        {day.weather[0].description}
                      </small>

                      {/* یادداشت‌ها */}
                      <Form
                        className="mt-3"
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (forecastNoteInput[index]) {
                            const updatedNotes = [
                              ...(forecastNotes[index] || []),
                              forecastNoteInput[index],
                            ];
                            setForecastNotes({
                              ...forecastNotes,
                              [index]: updatedNotes,
                            });
                            setForecastNoteInput({
                              ...forecastNoteInput,
                              [index]: "",
                            });
                          }
                        }}
                      >
                        <InputGroup className="mb-2">
                          <Form.Control
                            size="sm"
                            placeholder="یادداشت بنویسید..."
                            value={forecastNoteInput[index] || ""}
                            onChange={(e) =>
                              setForecastNoteInput({
                                ...forecastNoteInput,
                                [index]: e.target.value,
                              })
                            }
                          />
                          <Button
                            type="submit"
                            variant="outline-primary"
                            size="sm"
                          >
                            ثبت
                          </Button>
                        </InputGroup>
                      </Form>

                      {/* نمایش یادداشت‌ها */}
                      <ul className="list-unstyled text-start px-2">
                        {notes.map((note, noteIndex) => (
                          <li
                            key={noteIndex}
                            className="d-flex justify-content-between align-items-center mb-1"
                          >
                            <small>{note}</small>
                            <div>
                              <Button
                                variant="link"
                                size="sm"
                                onClick={() => {
                                  const updatedNotes = [...notes];
                                  const edited = prompt(
                                    "ویرایش یادداشت:",
                                    note
                                  );
                                  if (edited !== null) {
                                    updatedNotes[noteIndex] = edited;
                                    setForecastNotes({
                                      ...forecastNotes,
                                      [index]: updatedNotes,
                                    });
                                  }
                                }}
                              >
                                <MdEdit size={14} />
                              </Button>
                              <Button
                                variant="link"
                                size="sm"
                                onClick={() => {
                                  const updatedNotes = notes.filter(
                                    (_, i) => i !== noteIndex
                                  );
                                  setForecastNotes({
                                    ...forecastNotes,
                                    [index]: updatedNotes,
                                  });
                                }}
                              >
                                <MdDelete size={14} />
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}
export default Home;
