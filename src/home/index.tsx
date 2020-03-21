import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import { home } from './HomeScreen'

const Stack = createStackNavigator();


function HomeScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={home} />
        </Stack.Navigator>
    );
}


export default HomeScreen