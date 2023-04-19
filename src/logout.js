import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from './api/axios';

const Logout = () => {

    const navigate = useNavigation()
  
    const logout = async () => {
      try {
        await AsyncStorage.removeItem('token')
        axios.defaults.headers.common['Authorization'] = null
        navigate.navigate('Login')
      } catch(e) {
        console.log(e);
      }
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Are you sure you want to logout?</Text>
        <Text style={styles.text}>THANKS FOR USING TEACHER'S DIARY AAP</Text>
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor:'rgb(17, 82, 96)',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    button: {
      backgroundColor: 'red',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  export default Logout;
