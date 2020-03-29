import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, Image, ListRenderItem, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { getIconUrl, getForecastByCoords, getCurrentWeatherByCoords } from '../utils/Weather';
import { Tempreature } from '../../types/tempreture';
import { getDays, getMinMaxTempForDay, getMostCommonWeather, getMonthAndDay } from '../utils/forecastHelper';
import { LocationContext } from '../components/LocationProvider/LocationProvider'
import { theme } from '../components/ThemeProvider'
import pin from '../assets/map-marker.png'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    city: {
        fontSize: 24,
        fontWeight: '500',
        color: theme.colors.primaryTextColor
    },
    temp: {
        fontSize: 48,
        fontWeight: '500',
        color: theme.colors.primaryTextColor,
        marginVertical: theme.spacing.unit
    },
    desc: {
        fontSize: 16,
        fontWeight: '500',
        color: theme.colors.primaryTextColor
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: theme.dimensions.iconXL,
        height: theme.dimensions.iconXL
    },
    flex: {
        flex: 1,
    },
    forecastText: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.colors.primaryTextColor
    },
    row: {
        flexDirection: "row"
    },
    pin: {
        width: theme.dimensions.iconM,
        height: theme.dimensions.iconM
    },
    padding: {
        padding: theme.spacing.unit * 3
    }
})

const renderItem: ListRenderItem<ForecastResponse.ListItem[]> = ({ item }) => {
    const [tempMin, tempMax] = getMinMaxTempForDay(item);
    const dailyWeather = getMostCommonWeather(item);
    const date = new Date(item[0].dt * 1000);

    return (
        <View style={styles.center}>
            <Text style={styles.forecastText}>{getMonthAndDay(date)}</Text>
            <Image source={{ uri: getIconUrl(dailyWeather.icon) }} style={styles.icon} resizeMode='contain' />
            <Text style={styles.forecastText}>{tempMin}{Tempreature.degree}</Text>
            <Text style={styles.forecastText}>{tempMax}{Tempreature.degree}</Text>
        </View>
    )
}


const HomeScreen: React.FC = () => {
    const [localWeather, setLocalWeather] = useState<CurrentWeatherResponse.RootObject>()
    const [hourlyForcast, setHourlyForcast] = useState<ForecastResponse.RootObject>()
    const [error, setError] = useState("")
    const navigation = useNavigation()
    const coords = useContext(LocationContext)

    useEffect(() => {
        if (coords) {
            (async function () {
                try {
                    const local = await getCurrentWeatherByCoords(coords?.latitude, coords?.longitude)
                    setLocalWeather(local)
                } catch (err) {
                    setError(err.message)
                }
            }())
        }

    }, [coords])


    useEffect(() => {
        if (coords) {
            (async function () {
                try {
                    const forcast = await getForecastByCoords(coords?.latitude, coords?.longitude)
                    setHourlyForcast(forcast)
                } catch (err) {
                    setError(err.message)
                }

            }())
        }
    }, [coords])

    if (error) {
        return (
        <LinearGradient colors={[theme.colors.gradientTop, theme.colors.gradientBottom]} style={[styles.flex, styles.center, styles.padding]}>
            <Text style={styles.forecastText}>{error}</Text>
        </LinearGradient>
        )
    }


    if (!localWeather || !hourlyForcast) return (
        <LinearGradient colors={[theme.colors.gradientTop, theme.colors.gradientBottom]} style={styles.container} />
    )

    const { name, main, weather } = localWeather
    navigation.setOptions({ title: name })
    const [report] = weather;
    const { list } = hourlyForcast
    const days = getDays({ list })

    return (
        <LinearGradient colors={[theme.colors.gradientTop, theme.colors.gradientBottom]} style={styles.container}>
            <View style={[styles.center, styles.flex]}>
                <View style={[styles.row, styles.center]}>
                    <Image source={pin} style={styles.pin} resizeMode='contain' />
                    <Text style={styles.city}>{name}</Text>
                </View>
                <Text style={styles.temp}>{main?.temp} {Tempreature.celcius}</Text>
                <Text style={styles.desc}>{report.description}</Text>
                <Image source={{ uri: getIconUrl(report.icon) }} style={styles.icon} resizeMode='cover' />
            </View>
            <FlatList
                data={days}
                renderItem={renderItem}
                keyExtractor={item => `${item[0].dt}`}
                horizontal
                style={styles.flex}
            />
        </LinearGradient>
    );
}

export default HomeScreen