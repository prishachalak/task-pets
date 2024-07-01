import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Home = ({ navigation }) => {
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{
            justifyContent: 'center',
            flex: 1,
            }}
        >
            <Text style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 25, 
                marginBottom: 20,
            }} >
                Home
            </Text>
            <TouchableOpacity
                style={{
                    backgroundColor:'lightslategrey',
                    height: 40,
                    marginBottom: 20, 
                    justifyContent: 'center',
                    marginHorizontal: 20,
                    borderRadius: 10
                }}
                onPress={()=> navigation.navigate('Timetable')}
            >
                <Text style={{fontSize: 13, textAlign: 'center', fontWeight:'bold'}}>
                    Calendar Page
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor:'lightslategrey',
                    height: 40,
                    marginBottom: 20, 
                    justifyContent: 'center',
                    marginHorizontal: 20,
                    borderRadius: 10
                }}
                onPress={()=> navigation.navigate('Discussion')}
            >
                <Text style={{fontSize: 13, textAlign: 'center', fontWeight:'bold'}}>
                    Discussion Forum
                </Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    )
}

export default Home;
