import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Welcome from './src/screens/Welcome';
import Signup from './src/screens/Signup';
import Signin from './src/screens/Signin';
import Home from './src/screens/TempHome';
import Timetable from './src/screens/Timetable';
import Profile from './src/screens/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './context/auth';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator initialRouteName='Welcome'>
          <Stack.Screen name="Welcome" component={Welcome}/>
          <Stack.Screen name="Signup" component={Signup}/>
          <Stack.Screen name="Signin" component={Signin}/>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Timetable" component={Timetable}/>
          <Stack.Screen name="Profile" component={Profile}/>
        </Stack.Navigator>  
      </AuthProvider>
    </NavigationContainer>
  );
}

