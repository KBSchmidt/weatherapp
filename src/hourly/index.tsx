import React from 'react';
import { hourly } from './HourlyScreen';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

function HourlyScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Hourly" component={hourly} />
        </Stack.Navigator>
    );
}

export default HourlyScreen;
