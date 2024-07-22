import React, { useEffect, useContext, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { AuthContext } from "../../context/auth";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';

export default function Profile({ navigation }) {
  const [state, setState] = useContext(AuthContext);
  const { user } = state;
  const [imageUri, setImageUri] = useState(user.image ? user.image.url : '');

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  useEffect(() => {
    console.log("User updated:", user);
    if (user && user.image && user.image.url) {
      setImageUri(user.image.url);
    }
  }, [user]);

  const selectPhoto = async () => {
    try {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
      });

      if (!pickerResult.canceled) {
        await updateUserImage(pickerResult.assets[0].uri);
      } else {
        console.log('Image selection was cancelled');
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const updateUserImage = async (uri) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/user/${user._id}/update-image`, { imageUri: uri });
      const updatedUser = response.data;
      console.log("Updated User:", updatedUser);
      setState((prevState) => ({ ...prevState, user: updatedUser }));
      alert("Profile image updated!");
    } catch (error) {
      console.error("Error updating profile image: ", error.message);
      alert("Failed to update profile image. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Your Profile:</Text>
        <View style={styles.picContainer}>
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
          <TouchableOpacity onPress={selectPhoto}>
            <Text style={styles.uploadText}>{imageUri ? "Change Photo" : "Choose Photo"}</Text>
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
            <View style={styles.moduleButtonRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Lecture Videos')}
                style={styles.moduleButtons}
              >
                <Text style={styles.moduleButtonText}>Lecture Videos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Quest Page')}
                style={styles.moduleButtons}
              >
                <Text style={styles.moduleButtonText}>Quest Page</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text>Add your first module!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  headerRow: {
    marginBottom: 20,
    marginTop: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picContainer: {
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  uploadText: {
    marginBottom: 10,
    marginTop: 10,
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
    marginBottom: 20,
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
  },
  moduleStyle: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
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
  deleteIcon: {
    width: 20,
    height: 20,
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
  moduleButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});