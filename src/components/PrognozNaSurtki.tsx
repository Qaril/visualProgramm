import React from 'react';
import type {IWeather} from "../types/weather.ts";

const PrognozNaSutki = ({ items, isNight }: { items: IWeather[], isNight: boolean }) => {

    const startIndex = isNight
        ? items.findIndex(item => item.dt_txt?.includes("00:00:00"))
        : 0;

    const safeStart = startIndex === -1 ? 0 : startIndex;
    const finalItems = items.slice(safeStart, safeStart + 5);

    const formatTime = (dt: number, index: number) => {
        if (index === 0 && !isNight) return "Now";

        return new Date(dt * 1000).toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="prognoznaSutki">
            {finalItems.map((item, index) => (
                <div key={index} className="prognozNaSutki-item">
                    <span className="time">{formatTime(item.dt, index)}</span>
                    <span className="temp">{Math.round(item.main.temp)}°</span>
                    <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                        alt="icon"
                    />
                </div>
            ))}
        </div>
    );
};

export default PrognozNaSutki;