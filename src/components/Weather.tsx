import React from 'react';
import type {IWeather} from "../types/weather.ts";



    interface WeaterProps {
        data: IWeather;
    }


const Weather = ({data}: WeaterProps) => {

        const formatDate = (dt: number, timezone: number) => {
            const date = new Date((dt + timezone) * 1000);
            return date.toLocaleDateString('ru-RU', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
            });
        };

    return (
        <div className={"weather-main"}>
            <p className="date-display">{formatDate(data.dt, data.timezone)}</p>
            <h2>{data.name}</h2>
            <div className={"mathBlock"}>
                <h1>
                    {Math.round(data.main.temp)}°C

                    <img
                        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                        alt="weather-icon"
                        className="main-icon"
                    />

                </h1>
                <p>{data.weather[0].description}</p>
            </div>
            <div className={"details"}>
                <span>
                    Humidity: {data.main.humidity}%
                </span>
                <span>Wind {data.wind.speed}м/c</span>
                <span>Air Pressure: {Math.round(data.main.pressure * 0.750062)} мм</span>
            </div>
        </div>
    );
};

export default Weather;