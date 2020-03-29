import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { request, PERMISSIONS } from 'react-native-permissions';
import RNBootSplash from "react-native-bootsplash";

import HomeScreen from './home';
import LocationProvider from './components/LocationProvider';
import ThemeProvider from './components/ThemeProvider';

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
    RNBootSplash.hide({ duration: 250 });
    }, [])
    return (
        <ThemeProvider>
            <LocationProvider>
                <NavigationContainer>
                    <MainStack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <MainStack.Screen
                            name='Home'
                            component={HomeScreen}
                            options={{
                                title: ""
                            }}
                        />
                    </MainStack.Navigator>
                </NavigationContainer>
            </LocationProvider>
        </ThemeProvider>
    );
}

export default App