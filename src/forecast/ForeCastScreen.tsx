import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { getForecast } from '../utils/Weather';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


const Hourly: React.FC = () => {

    const [hourlyForcast, setHourlyForcast] = useState<ForecastResponse.RootObject>()

    useEffect(() => {
        (async function () {
            const res = await getForecast('Budapest')
            setHourlyForcast(res)
        }())
    }, [])

    if (!hourlyForcast) return null

    return (
        <View style={styles.container}>
            <Text>Hourly forecast</Text>
        </View>
    );
}

export default Hourly