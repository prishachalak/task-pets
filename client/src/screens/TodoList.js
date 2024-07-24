import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../context/auth'; // Adjust the path if necessary

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
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
        console.log('error with fetching todo');
      console.error(error);
    }
  };
  
  const addTodo = async () => {
    if (newTodo.trim() === '') return;
    try {
      const response = await axios.post(`http://localhost:8000/api/users/${user._id}/todos`, { text: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
        console.log('error with adding todo')
      console.error(error);
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{user ? user.name + "'s" : "Guest's"} Todo List</Text>
      <View style={styles.headerRow}>
        <TextInput
            style={styles.addBar}
            placeholder="Add new todo"
            value={newTodo}
            onChangeText={setNewTodo}
        />
        <TouchableOpacity  onPress={addTodo} >
            <Image source={require('../assets/enter.png')} style={styles.enterIcon}/>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={todos}
        // keyExtractor={(item) => item._id.toString()}
        keyExtractor={(item) => item._id ? item._id.toString() : Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.todoContainer}>
            <Text style={styles.todoText}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteTodo(item._id)}>
              <Text style={styles.deleteText}>Done</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#ffffff',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    addBar: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 10,
      borderRadius: 5,
    },
    enterIcon: {
      width: 30,
      height: 30,
      marginLeft: 10,
    },
    todoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      backgroundColor: '#f9f9f9',
      borderRadius: 5,
      marginBottom: 10,
    },
    todoText: {
      fontSize: 18,
    },
    deleteText: {
      color: 'red',
      fontWeight: 'bold',
    },
  });
  

export default TodoList;
