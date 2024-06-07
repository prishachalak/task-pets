import React from 'react';
import { View, TextInput } from 'react-native';
import Text from '@kaloraat/react-native-text';

const UserInput = ({name}) => {
    return (
        <View style={{ marginHorizontal:24 }}>
            <Text semi color="#990033">{name}</Text>
            <TextInput 
                style={{
                    borderBottomWidth: 0.5,
                    height: 30,
                    borderBottomColor: '#666',
                    marginBottom: 30,
                }}
            />
        </View>
    );
};

export default UserInput;

