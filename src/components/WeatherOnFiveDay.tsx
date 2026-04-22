import React from 'react';
import type {IWeather} from "../types/weather.ts";



interface WeatherOnFiveDayProps{
    items: IWeather[];
    timezone:number;
}


const WeatherOnFiveDay = ({items, timezone}: WeatherOnFiveDayProps) => {

    const dailyData = items.filter(item => item.dt_txt?.includes("12:00:00"));
    const formatDate = (dt: number) => {
        return new Date(dt * 1000).toLocaleDateString('ru-RU', {
            weekday: 'short',
            day:'numeric'
        });
    };

    return (
        <div className="fiveDay">
            {dailyData.map((item, index) => (
                <div key={index} className="fiveDay-item">
                    <span>{formatDate(item.dt)}</span>
                    <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                        alt="icon"
                    />
                    <div className="temp-range">
                        <span className="temp">{Math.round(item.main.temp)}°C</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

            export default WeatherOnFiveDay;