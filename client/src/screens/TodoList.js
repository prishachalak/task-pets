import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Image, FlatList, StyleSheet, TouchableOpacity, Modal, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { AuthContext } from '../../context/auth';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState({ id: null, text: '', description: '', deadline: new Date() });
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [state] = useContext(AuthContext);
  const { user } = state;

  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/${user._id}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async () => {
    if (currentTodo.text.trim() === '') {
      Alert.alert('Error in Adding Task', 'Title is required.');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8000/api/users/${user._id}/todos`, currentTodo);
      setTodos([...todos, response.data]);
      setCurrentTodo({ id: null, text: '', description: '', deadline: new Date() });
      setModalVisible(false);
    } catch (error) {
      console.log('Error adding todo');
      console.error(error);
    }
  };

  const editTodo = async () => {
    if (currentTodo.text.trim() === '') {
      Alert.alert('Error in Editing Task', 'Title is required.');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:8000/api/users/${user._id}/todos/${currentTodo.id}`, currentTodo);
      setTodos(todos.map(todo => (todo._id === currentTodo.id ? response.data : todo)));
      setCurrentTodo({ id: null, text: '', description: '', deadline: new Date() });
      setIsEditing(false);
      setModalVisible(false);
    } catch (error) {
      console.log('Error editing todo');
      console.error(error);
    }
  };

  const handleEditClick = (todo) => {
    setCurrentTodo({
      id: todo._id,
      text: todo.text,
      description: todo.description,
      deadline: new Date(todo.deadline)
    });
    setIsEditing(true);
    setModalVisible(true);
  };

  const handleSaveTodo = () => {
    if (isEditing) {
      editTodo();
    } else {
      addTodo();
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${user._id}/todos/${todoId}`);
      setTodos(todos.filter(todo => todo._id !== todoId));
    } catch (error) {
      console.error(error);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || currentTodo.deadline;
    setShowDatePicker(Platform.OS === 'ios');
    setCurrentTodo({ ...currentTodo, deadline: currentDate });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>{user ? user.name + "'s" : "Guest's"} Todo List</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{marginLeft: 'auto'}}>
          <Image source={require('../assets/add.png')} style={{width: 35, height: 35}} />
        </TouchableOpacity>
      </View>
      <Text style={{fontWeight: 'bold', color: 'maroon'}}>To Be Completed:</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id ? item._id.toString() : Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.todoContainer}>
          {item.description ? (
            <View style={{flex: 1}}>
              <Text style={styles.todoTitle}>{item.text}</Text>
              <Text style={styles.todoDescription}>Details: {item.description}</Text>
              <Text style={styles.todoDescription}>Deadline: {item.deadline ? new Date(item.deadline).toLocaleDateString() : 'None'}</Text>
            </View>
          ) : (
            <View style={{flex: 1}}>
              <Text style={styles.todoTitle}>{item.text}</Text>
              <Text style={styles.todoDescription}>Deadline: {item.deadline ? new Date(item.deadline).toLocaleDateString() : 'None'}</Text>
            </View>
          )}
            <TouchableOpacity onPress={() => handleEditClick(item)}>
              <Image source={require('../assets/edit.png')} style={{width: 25, height: 20, marginRight: 10}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTodo(item._id)}>
              <Image source={require('../assets/correct.png')} style={styles.checkIcon} />
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{isEditing ? 'Edit Task' : 'Add New Task'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={currentTodo.text}
              onChangeText={(text) => setCurrentTodo({ ...currentTodo, text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={currentTodo.description}
              onChangeText={(description) => setCurrentTodo({ ...currentTodo, description })}
            />
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{marginBottom: 10}}>
                <Text style={styles.datePickerText}>Select Deadline: </Text>
              </TouchableOpacity>
              <DateTimePicker
                value={currentTodo.deadline}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            </View>
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.enterText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveTodo}>
                <Text style={styles.enterText}>{isEditing ? 'Save Changes' : 'Add Task'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  todoDescription: {
    fontSize: 14,
    marginBottom: 5,
    color: 'black',
  },
  checkIcon: {
    width: 20,
    height: 20
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  datePickerText: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  },
  modalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  enterText: {
    color: 'maroon',
    fontWeight: 'bold',
  },
});

export default TodoList;