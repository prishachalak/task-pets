import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '@kaloraat/react-native-text';

const SubmitButton = ({ title, handleSubmit, loading }) => {
    return (
        <TouchableOpacity
            onPress={handleSubmit}
            style={{
                backgroundColor:"#ccccb3",
                height: 40,
                marginBottom: 20, 
                justifyContent: 'center',
                marginHorizontal: 20,
                borderRadius: 10
            }}
            >
            <Text bold medium center>
                {loading ? 'Please wait...' : title}
            </Text>
        </TouchableOpacity>
    );
};

export default SubmitButton;
