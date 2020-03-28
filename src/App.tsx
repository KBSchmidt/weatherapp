import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './home';

const MainStack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
        <MainStack.Navigator>
            <MainStack.Screen name="Home" component={HomeScreen} />
        </MainStack.Navigator>
    </NavigationContainer>
  );
}
