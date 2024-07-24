import React from 'react';
import Welcome from './src/screens/Welcome';
import Signup from './src/screens/Signup';
import Signin from './src/screens/Signin';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import QuestPage from './src/screens/QuestPage';
import LectureVideo from './src/screens/LectureVideo';
import TodoList from './src/screens/TodoList';
import QuizPage from './src/screens/QuizPage';
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
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="Quest Page" component={QuestPage}/>
          <Stack.Screen name="Todo List" component={TodoList}/>
          <Stack.Screen name="Lecture Videos" component={LectureVideo}/>
          <Stack.Screen name="Quiz" component={QuizPage} options={{ title: 'Quiz' }}/>
        </Stack.Navigator>  
      </AuthProvider>
    </NavigationContainer>
  );
}