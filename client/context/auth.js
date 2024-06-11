import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../config';

// to manage the authentication details throughout the app 
const AuthContext = createContext();

//to wrap the authentication details
const AuthProvider = ({ children }) => {

    // to update the authentication details
    const [state, setState] = useState({
        user: null,
        token: "",
    });

    // config axios
    axios.defaults.baseURL = API;

    useEffect(() => {
        const loadFromAsyncStorage = async () => {
            // retrieve the value stored within the key @auth (declared in signin and signup pages)
            let data = await AsyncStorage.getItem('@auth');
            // parsed into a JavaScript object
            const as = JSON.parse(data);
            // updates the state with the parsed user and token from this object
            setState({...state, user: as.user, token: as.token});
        };
        loadFromAsyncStorage();
    }, []); //the '[]' ensures that this only runs once, when the user first logs in

    return (
        <AuthContext.Provider value ={[state, setState]}>
            {children}
        </AuthContext.Provider>
    )
};

export {AuthContext, AuthProvider}; 