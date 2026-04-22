export interface IWeather {
    main: {
        temperature: number;
        feeling: number;
        moisture: number; //тут влага если что
        press: number;
    };
    weather: {
        id: number;
        main: string;
        additiional_info: string;
        icon: string; }[];
    wind: {
        speed: number;
    };
    cloudi: {
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
    id_city: number;
    city_namee:string;
    code: number;
}