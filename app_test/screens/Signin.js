import React, { useState } from 'react';
import { View } from 'react-native';
import Text from '@kaloraat/react-native-text';
import UserInput from '../components/auth/UserInput';
import SubmitButton from '../components/auth/SubmitButton';
import axios from 'axios';
import CircleLogo from '../components/auth/CircleLogo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true)
        if (!name || !email || !password) {
            alert("All fields are required!");
            setLoading(false);
            return;
        }
        try {
            const {data} = await axios.post('http://localhost:8000/api/signin', {
                name, 
                email, 
                password
            });
            setLoading(false);
            console.log('SIGN IN SUCCESS =>', data);
            alert("Sign In successful");
        } catch (err) {
            console.log(err)
            setLoading(false);
        }
    }

    return (
        <KeyboardAwareScrollView 
            contentContainerStyle={{ 
                flex: 1, 
                justifyContent: 'center',
            }}
        >
            <View style={{ marginVertical: 100 }}>
                <CircleLogo />
                <Text title bold center >
                    Sign In
                </Text>
                <UserInput 
                    name="EMAIL:" 
                    value={email} 
                    setValue={setEmail}
                    autoCompleteType="email"
                    keyboardType="email-address"
                />
                <UserInput 
                    name="PASSWORD:" 
                    value={password} 
                    setValue={setPassword}
                    secureTextEntry={true}
                    autoCompleteType="password"
                />
                <SubmitButton 
                    title="Sign Up" 
                    handleSubmit={handleSubmit} 
                    loading={loading}
                />
                <Text small center>
                    New Here? <Text bold color='#4d4d33'>Sign Up</Text>
                </Text>
                <Text small center bold color='#4d4d33' style={{ marginTop: 6}}>
                    Forgot Password?
                </Text>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default Signin;

