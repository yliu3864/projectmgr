import {city_data} from './area.data';

export const getProvinces = () => {
    const provinces = [];
    for (const province in city_data){
        provinces.push(province);
    }
    return provinces;
}

export const getCitiesByProvince = (province: string) => {
    if(!province || !city_data[province]){
        return ['wu'];
    }
    const cities = city_data[province];
    const citiesByProvince : string[] = [];
    for(const city in cities){
        citiesByProvince.push(city);
    }
    return citiesByProvince;
}