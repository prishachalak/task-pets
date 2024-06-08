import React from 'react';
import { View, TextInput, Text } from 'react-native';

const UserInput = ({ 
    name, 
    value, 
    setValue, 
    autoCapitalize = "none", 
    keyboardType = "default", 
    secureTextEntry = "false", 
}) => {
    return (
        <View style={{ marginHorizontal:24 }}>
            <Text style={{
                color: "#4d0000",
                fontSize: 15,
            }}>
                {name}
            </Text>
            <TextInput 
                autoCorrect={false}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                style={{
                    borderBottomWidth: 0.5,
                    height: 30,
                    borderBottomColor: '#666',
                    marginBottom: 30,
                }}
                value={value}
                onChangeText={(text) => setValue(text)}
            />
        </View>
    );
};

export default UserInput;

