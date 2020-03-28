import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { getCurrentWeather, getIconUrl, getForecast } from '../utils/Weather';
import { Tempreature } from '../types/tempreture';
import { getDays } from '../utils/forecastHelper';


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

    useEffect(() => {
        (async function () {
            const local = await getCurrentWeather('Budapest')
            setLocalWeather(local)
        }())

    }, [])

    useEffect(() => {
        (async function () {
            const forcast = await getForecast('Budapest')
            setHourlyForcast(forcast)
        }())
    }, [])

    useEffect(() => {
        // if (hasLocationPermission) {
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        // }
 
    }, [])

    if (!localWeather || !hourlyForcast) return null

    const { name, main, weather } = localWeather
    const [report] = weather;

    const { list } = hourlyForcast;
    // const numberOfDays = cnt / 8


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