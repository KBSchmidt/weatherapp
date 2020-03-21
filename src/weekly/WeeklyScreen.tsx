import React from 'react'
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function weekly() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Weekly forecast</Text>
        </View>
    );
}

const Stack = createStackNavigator();

function WeeklyScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Weekly" component={weekly} />
        </Stack.Navigator>
    );
}

export default WeeklyScreen;