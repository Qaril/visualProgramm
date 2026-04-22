import React from 'react';
import type {IWeather} from "../types/weather.ts";



    interface WeaterProps {
        data: IWeather;
    }


const Weather = ({data}: WeaterProps) => {
    return (
        <div className={"weather-main"}>
            <h2>{data.name}</h2>
            <div className={"mathBlock"}>
                <h1>
                    {Math.round(data.main.temp)}°C
                </h1>
                <p>{data.weather[0].description}</p>
            </div>
            <div className={"details"}>
                <span>
                    humidity: {data.main.humidity}%
                </span>
                <span>Wind {data.wind.speed}м/c</span>
            </div>
        </div>
    );
};

export default Weather;