export interface IWeather {
    main: {
        temp: number;
        feels_like: number;
        humidity: number; //тут влага если что
        pressure: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string; }[];
    wind: {
        speed: number;
    };
    clouds: {
        all: number;
    }
    name: string;
    dt:number;
    sys:{
        type?:number;
        id?: number;
        country: string;
        sunrise:number;
        sunset:number;
};
    timezone:number;
    id: number;
    city:string;
    cod: number;
    dt_txt?: string;
}