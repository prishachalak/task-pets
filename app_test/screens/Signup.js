import React, { useState } from 'react';
import { View } from 'react-native';
import Text from '@kaloraat/react-native-text';
import UserInput from '../components/auth/UserInput';
import SubmitButton from '../components/auth/SubmitButton';
import axios from 'axios';
import CircleLogo from '../components/auth/CircleLogo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Signup = ({ navigation }) => {
    const [name, setName] = useState("");
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
            const {data} = await axios.post('http://localhost:8000/api/signup', {
                name, 
                email, 
                password
            });
            setLoading(false);
            console.log('SIGN IN SUCCESS =>', data);
            alert("Sign Up successful");
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
                    Sign Up
                </Text>
                <UserInput 
                    name="NAME:" 
                    value={name} 
                    setValue={setName} 
                    autoCapitalize="words"
                    autoCorrect={false}
                />
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
                    Already Joined? <Text color='#ff2222' onPress={() => navigation.navigate("Signin")}>Sign In</Text>
                </Text>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default Signup;

