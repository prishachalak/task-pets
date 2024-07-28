import React, { useEffect, useContext, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { AuthContext } from "../../context/auth";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';

export default function Profile({ navigation }) {
  const [state, setState] = useContext(AuthContext);
  const { user } = state;
  const [imageUri, setImageUri] = useState(user.image ? user.image.url : '');

  useEffect(() => {
    if (user && user.image && user.image.url) {
      setImageUri(user.image.url);
    }
  }, [user]);

  const selectPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    try {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
      });

      if (!pickerResult.canceled) {
        await updateUserImage(pickerResult.assets[0].uri);
      } 
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const updateUserImage = async (uri) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/user/${user._id}/update-image`, { imageUri: uri });
      const updatedUser = response.data;
      setState((prevState) => ({ ...prevState, user: updatedUser }));
      alert("Profile image updated!");
    } catch (error) {
      console.error("Error updating profile image: ", error.message);
      alert("Failed to update profile image. Please try again.");
    }
  };

  const handleDeleteModule = async (moduleCode) => {
    try {
        const response = await axios.put(`http://localhost:8000/api/user/${user._id}/remove-module`, { moduleCode });
        const updatedUser = response.data;
        setState(prevState => ({ ...prevState, user: updatedUser }));
        alert("Module Removed!");
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
    <ScrollView style={styles.container}>
      <View style={{marginBottom: 20}}>
        <Text style={styles.headerText}>Your Profile:</Text>
        <View style={{alignItems: 'center', marginBottom: 15}}>
        <TouchableOpacity onPress={selectPhoto}>
          {imageUri ? (
              <Image 
                source={{ uri: imageUri }} 
                style={styles.profilePicture} 
              />
            ) : (
              <Image 
                source={require('../assets/profile.png')} 
                style={styles.profilePicture} 
              />
            )}
        </TouchableOpacity>
        </View>
        <Text style={styles.subHeadingText}>
          Name: <Text style={styles.subHeadingContent}>{user.name}</Text>
        </Text>
        <Text style={styles.subHeadingText}>
          Email: <Text style={styles.subHeadingContent}>{user.email}</Text>
        </Text>
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
        <View>
          <Text style={styles.selectedModulesText}>Selected Modules:</Text>
        </View>
      </View>
      {user.modules && user.modules.length > 0 ? (
        user.modules.map((module, index) => (
            <View key={index} style={styles.moduleStyle}>
              <View style={styles.moduleHeader}>
                <Text style={styles.buttonHeaderText}>Module</Text>
                <TouchableOpacity onPress={() => confirmDelete(module.moduleCode)}>
                  <Image
                    source={require('../assets/delete.png')}
                    style={{ width: 20, height: 20 }}
                  />
                </TouchableOpacity>
              </View>
              <Text>Code: {module.moduleCode}</Text>
              <Text>Title: {module.title} </Text>
              <View style={styles.moduleButtonRow}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Lecture Videos')}
                  style={styles.moduleButtons}
                >
                  <Text style={styles.buttonText}>Lecture Videos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => navigation.navigate('Quest Page', { user })}
                  onPress={() => {
                    if (user && user._id) {
                      console.log('Navigating to QuestPage with user:', user);
                      navigation.navigate('Quest Page', { userId: user._id });
                    } else {
                      console.error('User object is not defined or missing _id');
                    }
                  }}
                  style={styles.moduleButtons}
                >
                  <Text style={styles.buttonText}>Quest Page</Text>
                </TouchableOpacity>
              </View>
            </View>
        ))
      ) : (
        <Text>Add your first module!</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#ffffff',
    
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  uploadText: {
    marginBottom: 10,
    marginTop: 5,
    color: '#24304f', 
    fontSize: 11,
    fontWeight: 'bold'
  },
  subHeadingText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'maroon',
    fontWeight: 'bold',
  },
  subHeadingContent: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'normal',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: 'lightslategrey',
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 2,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectedModulesText: {
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 15,
  },
  moduleStyle: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  moduleButtonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  moduleButtons: {
    backgroundColor: 'darkgray',
    borderRadius: 40,
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 20,
  },
});