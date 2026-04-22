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
                    {Math.round(data.main.temperature)}°C
                </h1>
                <p>{data.weather[0].additiional_info}</p>
            </div>
            <div className={"details"}>
                <span>
                    humidity: {data.main.moisture}%
                </span>
                <span>Wind {data.wind.speed}м/c</span>
            </div>
        </div>
    );
};

export default Weather;