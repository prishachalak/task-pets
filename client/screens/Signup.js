import React, { useState } from 'react';
import { View, Text } from 'react-native';
import UserInput from '../components/auth/UserInput';
import SubmitButton from '../components/auth/SubmitButton';
import axios from 'axios';
import Logo from '../components/auth/Logo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import { signup } from '../../server/controllers/auth';

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

            if (data.error) {
                alert(data.error);
                setLoading(false);
            } else {
                setLoading(false);
                console.log('SIGN IN SUCCESS =>', data);
                alert("Sign Up Successful");
            }
        } catch (err) {
            alert('Sign in failed, try again.')
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
            <View style={{ 
                marginVertical: 100, 
            }}>
                <Logo />
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 25, 
                    marginBottom: 20,
                    textAlign: 'center',
                }}>
                    Sign Up
                </Text>
                <UserInput 
                    name="NAME:" 
                    name2="name"
                    value={name} 
                    setValue={setName} 
                    autoCapitalize="words"
                    autoCorrect={false}
                />
                <UserInput 
                    name="EMAIL:"
                    name2="email" 
                    value={email} 
                    setValue={setEmail}
                    autoCompleteType="email"
                    keyboardType="email-address"
                />
                <UserInput 
                    name="PASSWORD:" 
                    name2="password"
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
                <Text style={{fontSize: 13, textAlign: 'center'}}>
                    Already Joined?  <Text style={{
                        fontWeight: 'bold', 
                        color: '#ff2222'
                    }} onPress={() => navigation.navigate('Signin')}>
                        Sign In
                    </Text>
                </Text>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default Signup;

