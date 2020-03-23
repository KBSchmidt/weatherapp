import React from 'react';
import Hourly from './ForeCastScreen';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

function HourlyScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Hourly" component={Hourly} />
        </Stack.Navigator>
    );
}

export default HourlyScreen;
