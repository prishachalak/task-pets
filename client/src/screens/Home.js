import React, { useEffect, useState, useContext } from "react";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ActivityIndicator, 
    FlatList, 
    Image, 
    StyleSheet, 
    Alert } from "react-native";
import { Searchbar } from "react-native-paper";
import axios from "axios";
import { AuthContext } from '../../context/auth';

const Home = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modules, setModules] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredModules, setFilteredModules] = useState([]);
    const [state, setState] = useContext(AuthContext);
    const { user } = state;

    useEffect(() => {
        axios.get(`\module-list`)
            .then(response => {
                setModules(response.data); 
                setFilteredModules(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            });
    }, []);

    const searchMod = query => {
        setSearchQuery(query);
        if (query) {
            const filteredData = modules.filter(module =>
                module.moduleCode.toLowerCase().includes(query.toLowerCase()) || 
                module.title.toLowerCase().includes(query.toLowerCase())  
            );
            setFilteredModules(filteredData);              
        } else {
            setFilteredModules(modules);
        }
    };

    const confirmAdd = (module) => {
        Alert.alert(
            "Module Details",
            "Description: " + module.description,
            [
                {
                    text: "Cancel", 
                    style: 'cancel'
                },
                {
                    text: "Add", 
                    onPress: () => handleModuleClick(module)
                }
            ]
        );
    };

    const handleModuleClick = async module => {
        try {
            const moduleExists = user.modules.some(mod => mod.moduleCode === module.moduleCode);
            if (moduleExists) {
                alert("Module already added!");
                return;
            }
            const response = await axios.put(`http://localhost:8000/api/user/${user._id}/add-module`, { 
                module: { 
                    moduleCode: module.moduleCode, 
                    title: module.title, 
                    description: module.description 
                } 
            });
            const updatedUser = response.data;
            setState(prevState => ({ ...prevState, user: updatedUser }));
            alert("Module Added!");
        } catch (error) {
            console.error("Error adding module: ", error);
            alert("Failed to add module. Please try again.");
        }
    };

    const renderModuleItem = ({ item }) => (
        <TouchableOpacity onPress={() => confirmAdd(item)}>
            <View style={styles.moduleItem}>
                <Text style={{fontSize: 16}}> {item.moduleCode}: {item.title}</Text>
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
                    style={{ marginLeft: 'auto' }}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Image 
                        source={require('../assets/user.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <Searchbar
                placeholder="Find your module"
                onChangeText={searchMod}
                value={searchQuery}
                style={styles.searchBar}
            />
            <Text style={styles.subheading}> Click to add module </Text>
            <FlatList
                data={filteredModules}
                keyExtractor={item => item.moduleCode}
                renderItem={renderModuleItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#ffffff',
    },
    headerRow: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 15,
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
        marginBottom: 8,
        backgroundColor: '#f2f2f2',
    },
    subheading: {
        padding: 10, 
        color: 'red', 
        fontWeight: 'bold'
    },
    moduleItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default Home;


