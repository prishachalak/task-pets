import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Logo from '../components/auth/Logo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Welcome = ({navigation}) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        justifyContent: 'center',
        flex: 1,
        //alignItems: 'center'
      }}
    >
      <Logo />
      <Text style={{
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25, 
        marginBottom: 20,
      }} >
        Welcome
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Signin')}
        style={{
          backgroundColor:"#ccccb3",
          height: 40,
          marginBottom: 20, 
          justifyContent: 'center',
          marginHorizontal: 20,
          borderRadius: 10
        }}
      >
        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
          Sign In
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={{
          backgroundColor:"#ccccb3",
          height: 40,
          marginBottom: 20, 
          justifyContent: 'center',
          marginHorizontal: 20,
           borderRadius: 10
        }}
      >
        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  )
}

export default Welcome;