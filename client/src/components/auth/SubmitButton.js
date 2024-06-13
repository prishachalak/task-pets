import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

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
            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                {loading ? 'Please wait...' : title}
            </Text>
        </TouchableOpacity>
    );
};

export default SubmitButton;
