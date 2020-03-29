import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNBootSplash from "react-native-bootsplash";

import HomeScreen from './home';
import LocationProvider from './components/LocationProvider';
import ThemeProvider from './components/ThemeProvider';

const MainStack = createStackNavigator()

const App: React.FC = () => {

    useEffect(() => {
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