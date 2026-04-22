import React, {useEffect, useState} from 'react';
import type {IWeather} from "./types/weather.ts";
import axios from 'axios';
import Weather from "./components/Weather.tsx";
import WeatherOnFiveDay from "./components/WeatherOnFiveDay.tsx";

const App = () => {

    const [weather,setWeather] = useState<IWeather | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [city, setCity] = useState<string>("Novosibirsk");
    const [inputValue, setInputValue] = useState<string>("");
    const [fiveDayWeather, setFiveDayWeather] = useState<IWeather[] | null>(null);

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


    const fetchWeather = async (targetCityinSearch: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${targetCityinSearch}&appid=${API_KEY}&units=metric&lang=ru`);
            setWeather(response.data);

            const forecastRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${targetCityinSearch}&appid=${API_KEY}&units=metric&lang=ru`);
            setFiveDayWeather(forecastRes.data.list);
            setError(null);
        }catch (e) {
            setError("Ошибочка в загрузке погоды 😡");
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather(city);
    }, []);


    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if(inputValue.trim()) {
            fetchWeather(inputValue);
            setCity(inputValue);
        }
    };


    if (loading) return <div>Выполняется загрузка💫</div>
    if (error) return <div>ОШИБКА {error}</div>

    return (
        <div className={"main-app"}>
            <form onSubmit={handleSearch}>
                <input
                type={"text"} value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={"Введи название города"}
                />
                <button type={"submit"}>Поиск🚀</button>
            </form>
            {weather && <Weather data={weather} />}

            {fiveDayWeather && weather && (
                <WeatherOnFiveDay items={fiveDayWeather} timezone={weather.timezone} />
            )}
        </div>
    );
};
export default App;