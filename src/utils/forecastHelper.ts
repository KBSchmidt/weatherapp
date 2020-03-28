
interface DaysInput {
    list: ForecastResponse.List[];
}

type DaysArray = ForecastResponse.List[][]

export const getDays = ({ list }: DaysInput): DaysArray => {

    let prevDay = new Date(list[0].dt_txt).getDate()
    let dayNumber = 0;
    return list.reduce((acc, measurment, i) => {
        const currentDay = new Date(measurment.dt_txt).getDate()
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
    },[[]] as DaysArray)
}