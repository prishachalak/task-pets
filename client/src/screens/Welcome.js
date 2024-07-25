import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Logo from '../components/auth/Logo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Welcome = ({navigation}) => {
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Logo />
      <Text style={styles.header}> Welcome to TaskPets! </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signin')}
        style={styles.button}
      >
        <Text style={styles.buttonText}> Sign In </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={styles.button}
      >
        <Text style={styles.buttonText}> Sign Up </Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25, 
    marginBottom: 20,
  },
  button: {
    backgroundColor:'lightslategrey',
    height: 40,
    marginBottom: 20, 
    justifyContent: 'center',
    marginHorizontal: 20,
    borderRadius: 10
  },
  buttonText: {
    fontWeight: 'bold', 
    textAlign: 'center'
  }
});

export default Welcome;