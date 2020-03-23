import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Home from './HomeScreen'

const Stack = createStackNavigator();


function HomeScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}


export default HomeScreen