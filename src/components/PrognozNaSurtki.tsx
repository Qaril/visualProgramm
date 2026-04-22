import React from 'react';
import type {IWeather} from "../types/weather.ts";


interface PrognozNaSutkiProps{
    items: IWeather[];
}


const PrognozNaSutki = ({ items }: PrognozNaSutkiProps) => {

    const prognozNaSutkiData = items.slice(0, 5);

    const formatTime = (dt: number, index: number) => {
        if (index === 0) return "Now";
        return new Date(dt * 1000).toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="prognoznaSutki">
            {prognozNaSutkiData.map((item, index) => (
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