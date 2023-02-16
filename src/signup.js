import React, { useState, useEffect } from 'react';
import {View,Text, StyleSheet, TextInput,TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from "./api/axios";

const Singup = () => {
  
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      const response = await axios.post('/users', 
        JSON.stringify({
          "email": email,
          'password': password
        }),
        {
          headers: { 'Content-Type': 'application/json'},
        })
      window.alert("Registration Successful!")

      navigation.navigate('Login');

    }catch(error){
      window.alert("Error")
    }
  }
  

  return (
    <View style={styles.container}>
      
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  label: {
    color: "black",
    fontWeight: 'bold',
    marginTop: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginTop: 10,
    fontSize: 18
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 20,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
export default Singup;
