import React from 'react';
import type { IWeather } from "../types/weather.ts";



interface WeatherOnFiveDayProps {
    items: IWeather[];
    timezone: number;
}

const WeatherOnFiveDay = ({ items, filterHour }: { items: IWeather[], filterHour: string }) => {

    const dayData = items.filter(item => item.dt_txt?.includes(`${filterHour}:00:00`));
    const nightData = items.filter(item => item.dt_txt?.includes('00:00:00'));


    return (
        <div className="fiveDay">
            {dayData.map((dayItem, index) => {

                const nightItem = nightData[index];

                return (
                    <div key={index} className="fiveDay-item">
                        <span>
                            {new Date(dayItem.dt * 1000).toLocaleDateString('ru-RU', {
                                weekday: 'short',
                                day: 'numeric'
                            })}
                        </span>

                        <img
                            src={`https://openweathermap.org/img/wn/${dayItem.weather[0].icon}.png`}
                            alt="icon"
                        />

                        <div className="temp-range">

                            <span className="day-temp">{Math.round(dayItem.main.temp)}°</span>

                            {nightItem && (
                                <span className="night-temp" style={{ opacity: 0.6, marginLeft: '8px' }}>
                                    {Math.round(nightItem.main.temp)}°
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default WeatherOnFiveDay;