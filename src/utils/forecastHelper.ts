import {  } from 'react-native-localize';

interface DaysInput {
    list: ForecastResponse.ListItem[];
}

export type DaysArray = ForecastResponse.ListItem[][]

export const getDays = ({ list }: DaysInput): DaysArray => {

    const today =  new Date().getDate()
    let prevDay = new Date(list[0].dt_txt).getDate()
    let dayNumber = 0;
    return list.reduce((acc, measurment, i) => {
        const currentDay = new Date(measurment.dt_txt).getDate()

        if (currentDay === today) {
            prevDay = currentDay;
            return acc
        }

        if (prevDay !== currentDay) {
            dayNumber += 1;
        }
        if (acc[dayNumber]) {
            acc[dayNumber].push(list[i])
        } else {
            acc[dayNumber] = [list[i]]
        }
        prevDay = currentDay;
        return acc
    }, [[]] as DaysArray).filter(day => day.length)
}

export const getMinMaxTempForDay = (daysArray: ForecastResponse.ListItem[]): number[] => {
    const TempMin = Math.min(...daysArray.map(({ main: { temp_min } }) => temp_min))
    const TempMax = Math.max(...daysArray.map(({ main: { temp_max } }) => temp_max))
    return [TempMin, TempMax]
}

export const getMostCommonWeather = (days: ForecastResponse.ListItem[]) => {

    const mainWeatherPattern = days.map(({ weather }) => weather[0].main).reduce(
        (a, b, i, arr) =>
            (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b),
        "")

    const [mainWeather] = days.filter(({ weather }) => weather[0].main === mainWeatherPattern)

    const [weather] = mainWeather.weather

    return weather
}


export const getMonthAndDay = (date: Date) => {

    return `${date.getMonth()+1}/${date.getDate()}`
}