import React, { createContext, useContext, useEffect, useState } from 'react';

const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState("");

  const API_KEY = "37cb4f2fd617d22d37f88face0e1a4b9";

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`
      );
      if (!res.ok) throw new Error("Weather data not found");
      const data = await res.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      console.error("Weather error:", err);
      setError("City not found!");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async () => {
    if (!city.trim()) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=en`
      );
      if (!res.ok) throw new Error("Forecast data not found");
      const data = await res.json();

      // فقط داده‌هایی که ساعت ۱۲ ظهر هستند
      const filtered = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(filtered);
    } catch (err) {
      console.error("Forecast error:", err);
      setForecast([]);
    }
  };

  const fetchForecastWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    try {
      await fetchWeather();   // هواشناسی فعلی
      await fetchForecast();  // پیش‌بینی چندروزه
    } catch (err) {
      console.error("fetchForecastWeather error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme === "dark" ? "dark-theme" : "";
    }
  }, []);

  const setLightTheme = () => {
    setTheme("light");
    localStorage.setItem("theme", "light");
    document.body.className = "";
  };

  const setDarkTheme = () => {
    setTheme("dark");
    localStorage.setItem("theme", "dark");
    document.body.className = "dark-theme";
  };

  const toggleTheme = () => {
    theme === "light" ? setDarkTheme() : setLightTheme();
  };

  return (
    <LayoutContext.Provider
      value={{
        theme,
        setLightTheme,
        setDarkTheme,
        toggleTheme,
        weather,
        setWeather,
        forecast,
        setForecast,
        loading,
        setLoading,
        error,
        setError,
        city,
        setCity,
        fetchWeather,
        fetchForecast,
        fetchForecastWeather,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;

export const useLayoutContext = () => {
  return useContext(LayoutContext);
};