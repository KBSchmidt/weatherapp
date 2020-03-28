import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getIconUrl, getForecastByCoords, getCurrentWeatherByCoords } from '../utils/Weather';
import { Tempreature } from '../../types/tempreture';
import { getDays } from '../utils/forecastHelper';
import { LocationContext } from '../components/LocationProvider'
import { ThemeContext } from '../components/ThemeProvider'
import { useNavigation } from '@react-navigation/native';


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
    const navigation = useNavigation()
    const coords = useContext(LocationContext)
    const theme = useContext(ThemeContext)

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

    navigation.setOptions({ title: name })

    return (
        <LinearGradient colors={[theme.colors.gradientTop, theme.colors.gradientBottom]} style={styles.container}>
            <View style={styles.center}>
                <Text style={styles.city}>{name}</Text>
                <Text style={styles.temp}>{main?.temp} {Tempreature.celcius}</Text>
            </View>
            <Image source={{ uri: getIconUrl(report.icon) }} style={styles.icon} resizeMode='contain' />
        </LinearGradient>
    );
}

export default HomeScreen