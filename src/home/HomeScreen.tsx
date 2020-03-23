import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { getCurrentWeather, getIconUrl } from '../utils/Weather';
import { Tempreature } from '../types/tempreture';


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

const Home: React.FC = () => {
    const [localWeather, setLocalWeather] = useState<CurrentWeatherResponse.RootObject>()

    useEffect(() => {
        (async function () {
            const res = await getCurrentWeather('Budapest')
            setLocalWeather(res)
        }())

    }, [])

    if (!localWeather) return null

    const {name, main, weather} = localWeather
    const [report] = weather;

    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <Text style={styles.city}>{name}</Text>
                <Text style={styles.temp}>{main?.temp} {Tempreature.celcius}</Text>
            </View>
            <Image source={{uri: getIconUrl(report.icon)}} style={styles.icon} resizeMode='contain'/>
        </View>
    );
}

export default Home