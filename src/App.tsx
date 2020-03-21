import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './home';
import HourlyScreen from './hourly';
import WeeklyScreen from './weekly';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Hourly" component={HourlyScreen} />
        <Tab.Screen name="Weekly" component={WeeklyScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
