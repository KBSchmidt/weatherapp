import querystring from 'query-string';
import { getCountry } from 'react-native-localize';
import { baseUrl, apiUrl } from './Constants'

const config = {
    APPID: 'bd1d8c76448e688774adc68ffbfe76a3',
    baseUrl: apiUrl,
    current: '/data/2.5/weather?',
    hourly: '/data/2.5/forecast?',
    units: 'metric',
    lang: getCountry().toLowerCase(),
}


export const getCurrentWeatherByCoords = async (lat: number, lon: number) => {

    const url = `${config.baseUrl}${config.current}${querystring.stringify({ APPID: config.APPID, lat, lon, lang: config.lang, units: config.units })}`
    const res = await fetch(url)

    if (res.ok) {
        return await res.json()
    }
    throw await res.json()
}

export const getForecastByCoords = async (lat: number, lon: number) => {
    const url = `${config.baseUrl}${config.hourly}${querystring.stringify({ APPID: config.APPID, lat, lon, lang: config.lang, units: config.units })}`
    const res = await fetch(url)
    if (res.ok) {
        return await res.json()
    }
    throw await res.json()
}

export const getIconUrl = (icon: string) => {
    return `${baseUrl}/img/wn/${icon}@2x.png`
}