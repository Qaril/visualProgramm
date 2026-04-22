import React, {useEffect, useState} from 'react';
import type {IWeather} from "./types/weather.ts";
import axios from 'axios';
import Weather from "./components/Weather.tsx";

const App = () => {

    const [weather,setWeather] = useState<IWeather | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const city = "Novosibirsk";

    const fetchWeather = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`);            setWeather(response.data);
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
        fetchWeather();
    }, []);


    if (loading) return <div>Выполняется загрузка💫</div>
    if (error) return <div>ОШИБКА {error}</div>

    return (
        <div className={"main-app"}>
            {weather && <Weather data={weather} />}
        </div>
    );
};
export default App;