import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { request, PERMISSIONS } from 'react-native-permissions';


import HomeScreen from './home';
import { Platform } from 'react-native';
import LocationProvider from './components/LocationProvider';

const MainStack = createStackNavigator()

const App: React.FC = () => {
    useEffect(() => {
        Platform.select({
            ios: () => {
                request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
                    console.log(result)
                })
            },
            android: () => {
                request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then(result => {
                    console.log(result)
                });
                request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
                    console.log(result)
                });
            }
        });

    }, [])
    return (
        <LocationProvider>
            <NavigationContainer>
                <MainStack.Navigator>
                    <MainStack.Screen name="Home" component={HomeScreen} />
                </MainStack.Navigator>
            </NavigationContainer>
        </LocationProvider>
    );
}

export default App