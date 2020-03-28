import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { getIconUrl, getForecastByCoords, getCurrentWeatherByCoords } from '../utils/Weather';
import { Tempreature } from '../types/tempreture';
import { getDays } from '../utils/forecastHelper';
import { LocationContext } from '../components/LocationProvider'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    city: {
        fontSize: 24,
        fontWeight: '500',
    },
    temp: {
        fontSize: 32
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 64,
        height: 64
    }
})


const HomeScreen: React.FC = () => {
    const [localWeather, setLocalWeather] = useState<CurrentWeatherResponse.RootObject>()
    const [hourlyForcast, setHourlyForcast] = useState<ForecastResponse.RootObject>()
    const coords = React.useContext(LocationContext)

    useEffect(() => {
        if (coords) {
            (async function () {
                const local = await getCurrentWeatherByCoords(coords?.latitude, coords?.longitude)
                setLocalWeather(local)
            }())
        }

    }, [coords])


    useEffect(() => {
        if (coords) {
            (async function () {
                const forcast = await getForecastByCoords(coords?.latitude, coords?.longitude)
                setHourlyForcast(forcast)
            }())
        }
    }, [coords])


    if (!localWeather || !hourlyForcast) return null

    const { name, main, weather } = localWeather
    const [report] = weather;

    const { list } = hourlyForcast;


    console.log('getDays', getDays({ list }))

    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <Text style={styles.city}>{name}</Text>
                <Text style={styles.temp}>{main?.temp} {Tempreature.celcius}</Text>
            </View>
            <Image source={{ uri: getIconUrl(report.icon) }} style={styles.icon} resizeMode='contain' />
        </View>
    );
}

export default HomeScreen