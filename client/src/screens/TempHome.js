import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, Image, StyleSheet } from "react-native";
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Searchbar } from "react-native-paper";
import axios from "axios";
import { AuthContext } from '../../context/auth';

const Home = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modules, setModules] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredModules, setFilteredModules] = useState([]);
    const [state] = useContext(AuthContext);
    const { user } = state;

    useEffect(() => {
        axios.get(`\module-list`)
            .then(response => {
                setModules(Object.entries(response.data)); // Convert to array of [code, name] pairs
                setFilteredModules(Object.entries(response.data));
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            });
    }, []);

    const onChangeSearch = query => {
        setSearchQuery(query);
        if (query) {
            const filteredData = modules.filter(([code, name]) =>
                code.toLowerCase().includes(query.toLowerCase()) || 
                name.toLowerCase().includes(query.toLowerCase())  
            );
            setFilteredModules(filteredData);              
        } else {
            setFilteredModules(modules);
        }
    };

    const handleModuleClick = async module => {
        try {
            const response = await axios.post(`/users/add-module`, { email: user.email, moduleId: module._id });
            console.log('Module added to user:', response.data);
            // Optionally, update local state or UI after successful addition
        } catch (error) {
            console.error('Error adding module to user:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    const renderModuleItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleModuleClick(item)}>
            <View style={{ padding: 10 }}>
                <Text>{item[0]} - {item[1]}</Text>
            </View>
        </TouchableOpacity>
    );

    if (isLoading) {
        return <ActivityIndicator size="large" />;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.text}>
                    Welcome {user ? user.name : 'Guest'}!
                    
                </Text>
                <TouchableOpacity 
                    style={styles.iconContainer}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Image 
                        source={require('../assets/user.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                {/* <Text style={styles.text}>
                    Welcome {user ? user.name : 'Guest'}!
                    
                </Text> */}
            </View>
            <Searchbar
                placeholder="Find your module"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <FlatList
                data={filteredModules}
                keyExtractor={item => item[0]}
                renderItem={renderModuleItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    headerRow: {
        flexDirection: 'row', // Arrange items horizontally
        alignItems: 'center', // Center items vertically
        marginBottom: 15,
        marginTop: 10
    },
    iconContainer: {
        marginLeft: 140,
    },
    icon: {
        width: 30,
        height: 30,
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        
    },
    searchBar: {
        marginBottom: 10,
    },
});

export default Home;


