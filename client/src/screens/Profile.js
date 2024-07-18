// import React, { useContext } from "react";
// import { Text, View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
// import { AuthContext } from "../../context/auth";
// import axios from "axios";

// export default function Profile({navigation}) {
//     const [state, setState] = useContext(AuthContext);
//     const { user } = state;

//     const handleDeleteModule = async (moduleCode) => {
//         try {
//             const response = await axios.put(`http://localhost:8000/api/user/${user._id}/remove-module`, { moduleCode });
//             const updatedUser = response.data;
//             setState(prevState => ({ ...prevState, user: updatedUser }));
//             alert("Module removed!");
//         } catch (error) {
//             console.error("Error removing module: ", error.message);
//             alert("Failed to remove module. Please try again.");
//         }
//     };

//     const confirmDelete = (moduleCode) => {
//         Alert.alert(
//             "Confirm Delete",
//             "Are you sure you want to delete this module?",
//             [
//                 {
//                     text: "Cancel",
//                     style: "cancel"
//                 },
//                 {
//                     text: "OK",
//                     onPress: () => handleDeleteModule(moduleCode)
//                 }
//             ]
//         );
//     };
//     return (
//         <View style={styles.container}>
//             <View style={styles.headerRow}>
//                 <Text style={styles.headerText}>Your Profile:</Text>
//                 <Text style={styles.subHeadingText}>Name: <Text style={styles.subHeadingContent}>{user.name}</Text></Text>
//                 <Text style={styles.subHeadingText}>Email: <Text style={styles.subHeadingContent}>{user.email}</Text></Text>
//                 <View style={styles.buttonRow}>
//                     <TouchableOpacity
//                         style={styles.todoButton}
//                         onPress={() => navigation.navigate('Todo List')}
//                     >
//                         <Text>To-do List</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={styles.todoButton}
//                         onPress={() => navigation.navigate('Welcome')}
//                     >
//                         <Text>Sign out</Text>
//                     </TouchableOpacity>
//                 </View>
                
//                 <View styles={styles.selectedModsContainer}> 
//                     <Text>Selected Modules</Text>
//                 </View>
                
//             </View>
//             {user.modules && user.modules.length > 0 ? (
//                 user.modules.map((module, title) => (
//                     <View key={title}>
//                         <TouchableOpacity
//                             onPress={() => navigation.navigate('TempQuest')}
//                             style={styles.moduleButton}
//                         >
//                             <View style={styles.buttonHeader}>
//                                 <Text styles={styles.buttonHeaderText}>Module</Text>
//                                 <TouchableOpacity
//                                     onPress={() => confirmDelete(module.moduleCode)}
//                                     style={styles.deleteButton}
//                                 >
//                                     <Image
//                                         source={require('../assets/delete.png')}
//                                         style={styles.deleteIcon}
//                                     />
//                                 </TouchableOpacity>
//                             </View>
//                             <Text>Code: {module.moduleCode}</Text>
//                             <Text>Title: {module.title} </Text>
//                             <TouchableOpacity onPress={() => navigation.navigate('Lecture Video')}>
//                                 <Text style={styles.videoText}>Lecture Video</Text>
//                             </TouchableOpacity>                        
//                         </TouchableOpacity>
                        
//                     </View>
//                 ))
//             ) : (
//                 <Text>Add your first module!</Text>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 10,
//     },
//     headerRow: {
//         marginBottom: 15,
//         marginTop: 10
//     },
//     headerText: {
//         fontSize: 25,
//         fontWeight: 'bold',
//         marginBottom: 7,
//     },
//     subHeadingText: {
//         fontSize: 18,
//         marginBottom: 7,
//         color: 'maroon',
//         fontWeight: 'bold',
//     },
//     subHeadingContent: {
//         fontSize: 18,
//         marginBottom: 7,
//         color: 'black',
//         fontWeight: 'normal'
        
//     },
//     selectedModsContainer: {
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     buttonRow: {
//         flexDirection: 'row', 
//         alignItems: 'center', 
//         marginBottom: 15,
//         marginTop: 10
//     },
//     todoButton: {
//         backgroundColor: 'grey',
//         height: 35,
//         marginBottom: 20, 
//         justifyContent: 'center',
//         marginHorizontal: 160,
//         borderRadius: 10,
//         padding: 10,
//     },
//     moduleButton: {
//         backgroundColor:'lightslategrey',
//         height: 90,
//         marginBottom: 20, 
//         justifyContent: 'center',
//         marginHorizontal: 6,
//         borderRadius: 10,
//         padding: 10,
//     },
//     buttonHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 5,
//     },
//     buttonHeaderText: {
//         fontSize: 10,
//         fontWeight: 'bold',
//     },
//     deleteIcon: {
//         width: 20,
//         height: 20,
//     },
//     videoText: {
//         color: 'darkred',
//         fontWeight: 'bold'
//     }
// })

import React, { useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { AuthContext } from "../../context/auth";
import axios from "axios";

export default function Profile({navigation}) {
    const [state, setState] = useContext(AuthContext);
    const { user } = state;

    const handleDeleteModule = async (moduleCode) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/user/${user._id}/remove-module`, { moduleCode });
            const updatedUser = response.data;
            setState(prevState => ({ ...prevState, user: updatedUser }));
            alert("Module removed!");
        } catch (error) {
            console.error("Error removing module: ", error.message);
            alert("Failed to remove module. Please try again.");
        }
    };

    const confirmDelete = (moduleCode) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this module?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => handleDeleteModule(moduleCode)
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.headerText}>Your Profile:</Text>
                <Text style={styles.subHeadingText}>Name: <Text style={styles.subHeadingContent}>{user.name}</Text></Text>
                <Text style={styles.subHeadingText}>Email: <Text style={styles.subHeadingContent}>{user.email}</Text></Text>
                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('Todo List')}
                    >
                        <Text style={styles.buttonText}>To-do List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('Welcome')}
                    >
                        <Text style={styles.buttonText}>Sign out</Text>
                    </TouchableOpacity>
                </View>
                <View styles={styles.selectedModsContainer}> 
                    <Text style={{fontSize: 15, alignSelf: 'center', fontWeight: 'bold'}}> Selected Modules:</Text>
                </View>
            </View>
            {user.modules && user.modules.length > 0 ? (
                user.modules.map((module, title) => (
                    <View key={title} style={styles.moduleContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('TempQuest')}
                            style={styles.moduleButton}
                        >
                            <View style={styles.buttonHeader}>
                                <Text style={styles.buttonHeaderText}>Module</Text>
                                <TouchableOpacity
                                    onPress={() => confirmDelete(module.moduleCode)}
                                    style={styles.deleteButton}
                                >
                                    <Image
                                        source={require('../assets/delete.png')}
                                        style={styles.deleteIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text>Code: {module.moduleCode}</Text>
                            <Text>Title: {module.title} </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Lecture Video')}>
                                <Text style={styles.videoText}>Lecture Video</Text>
                            </TouchableOpacity>                        
                        </TouchableOpacity>
                    </View>
                ))
            ) : (
                <Text>Add your first module!</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    headerRow: {
        marginBottom: 15,
        marginTop: 10,
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 7,
    },
    subHeadingText: {
        fontSize: 18,
        marginBottom: 7,
        color: 'maroon',
        fontWeight: 'bold',
    },
    subHeadingContent: {
        fontSize: 18,
        marginBottom: 7,
        color: 'black',
        fontWeight: 'normal',
    },
    selectedModsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonRow: {
        flexDirection: 'row', 
        justifyContent: 'center', // Center buttons horizontally
        alignItems: 'center', 
        marginBottom: 15,
        marginTop: 10,
    },
    actionButton: {
        backgroundColor: 'grey',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    moduleContainer: {
        marginBottom: 10,
    },
    moduleButton: {
        backgroundColor: 'lightslategrey',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        justifyContent: 'center',
    },
    buttonHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    buttonHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteIcon: {
        width: 20,
        height: 20,
    },
    videoText: {
        color: 'darkred',
        fontWeight: 'bold',
        marginTop: 8
    },
});