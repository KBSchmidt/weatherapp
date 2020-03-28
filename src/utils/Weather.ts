import querystring from 'query-string';
import * as RNLocalize from 'react-native-localize';
import { baseUrl, apiUrl } from './Constants'

const config = {
    APPID: 'bd1d8c76448e688774adc68ffbfe76a3',
    baseUrl: apiUrl,
    current: '/data/2.5/weather?',
    hourly: '/data/2.5/forecast?',
    units: 'metric',
    lang: RNLocalize.getCountry().toLowerCase(),
}



export const getCurrentWeather = async (city: string) => {
    try {
        const url = `${config.baseUrl}${config.current}${querystring.stringify({ APPID: config.APPID, q: city, lang: config.lang, units: config.units })}`
        console.log(url)
        const res = await fetch(url)

        if (res.ok) {
            return await res.json()
        }
        return await res.text()

    } catch (error) {
        return error
    }
}

export const getForecast = async (city: string) => {
    try {
        const url = `${config.baseUrl}${config.hourly}${querystring.stringify({ APPID: config.APPID, q: city, lang: config.lang, units: config.units })}`
        const res = await fetch(url)
        console.log(url)
        if (res.ok) {
            return await res.json()
        }
        return await res.text()

    } catch (error) {
        return error
    } 
}

export const getIconUrl = (icon: string) => {
    return `${baseUrl}/img/wn/${icon}@2x.png`
}