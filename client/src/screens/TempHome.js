import React from "react";
import { Text, View } from "react-native";
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
        </KeyboardAwareScrollView>
    )
}

export default Home;
