import React from 'react'
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function hourly() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hourly forecast</Text>
        </View>
    );
}

const Stack = createStackNavigator();

function HourlyScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Hourly" component={hourly} />
        </Stack.Navigator>
    );
}

export default HourlyScreen;