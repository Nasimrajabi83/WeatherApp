import {
    WiDaySunny,
    WiCloud,
    WiRain,
    WiSnow,
    WiThunderstorm,
    WiFog,
    WiDayCloudy,
    WiNightClear,
    WiNightCloudy
  } from "react-icons/wi";
  
  export const getWeatherIcon = (main, isDay = true) => {
    switch (main.toLowerCase()) {
      case "clear":
        return isDay ? WiDaySunny : WiNightClear;
      case "clouds":
        return isDay ? WiDayCloudy : WiNightCloudy;
      case "rain":
        return WiRain;
      case "drizzle":
        return WiRain;
      case "thunderstorm":
        return WiThunderstorm;
      case "snow":
        return WiSnow;
      case "mist":
      case "fog":
        return WiFog;
      default:
        return WiCloud;
    }
  };