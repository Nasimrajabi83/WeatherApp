import React, { createContext, useContext, useEffect, useState } from 'react'

const LayoutContext= createContext()
const LayoutProvider=({children})=>{
    const [theme, setTheme] = useState("light");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [city, setCity] = useState("");

    const fetchWeather = async () => {
        if (!city.trim()) return;
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=37cb4f2fd617d22d37f88face0e1a4b9&units=metric&lang=en`
            );
            if (!response.ok) {
                throw new Error("Weather data not found");
            }
            const data = await response.json();
            setWeather(data);
            setError(null);
        } catch (error) {
            console.error(error);
            setError("City not found!");
            setWeather(null);
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
      if (theme === "light") {
        setDarkTheme();
      } else {
        setLightTheme();
      }
    };  
return(
<LayoutContext.Provider
       value={{
        theme,
         setLightTheme,
         setDarkTheme,
         toggleTheme,
         weather,
         setWeather,
         loading,
         setLoading,
         city, 
         setCity,
         fetchWeather, 
         error,        
         setError,
      }}>
        {children}
    </LayoutContext.Provider>
)
}
export default LayoutProvider
export const useLayoutContext =()=>{
    return useContext(LayoutContext)
 }
    