import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Welcome from './screens/Welcome';
import Signup from './screens/Signup';
import Signin from './screens/Signin';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" component={Welcome}/>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="Signin" component={Signin}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

