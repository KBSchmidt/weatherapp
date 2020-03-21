import React from 'react';
import { weekly } from './WeeklyScreen';

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

function WeeklyScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Weekly" component={weekly} />
    </Stack.Navigator>
  );
}

export default WeeklyScreen;
