import React, { useState,useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, ImageBackground, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from './api/axios';



import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {

  //{email,password}
  
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 
  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      const response = await axios.post('/auth/signin', 
        JSON.stringify({email,password}),
        {
          headers: { 'Content-Type': 'application/json'},
        })

     
      if(response.data.token){
        const token = response.data.token
        await AsyncStorage.setItem('token',token)
        console.log("Successful Item")
      }
      await AsyncStorage.setItem('email', JSON.stringify(response.data.account.email))

      navigation.navigate('Drawer');


    }catch(error){
      console.log(error);
      alert("Invalid email or password!");
    }
  
  };
  
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ height: '100%', width: '100%' }}
        source={require('../assets/pic.png')}
        resizeMode='contain'>
        
        <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate('signup')}>
          <Text style={styles.signInText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.userStyle}>TEACHER'S DIARY</Text>

        <View style={styles.bottomContainer}>

          <View style={styles.form}>

            <Text style={styles.subheading}>Email</Text>
            <TextInput
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text)}
      />
          </View>

          <View style={styles.form}>

            <Text style={styles.subheading}>Password</Text>
            <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
      />

          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>LogIn</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </View>
  );
};





const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  button: {
    backgroundColor: 'rgba(123,104,238,0.8)',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: 'white'
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    letterSpacing: 0.5
  },
  userStyle: {
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: 'center',
    marginTop: '20%'
  },
  form: {
    marginVertical: 1,
    alignItems: 'center'
  },
  input: {
    color:'black',
    height: 40,
    width: '70%',
    backgroundColor: 'lightblue',
    borderRadius: 5,
    padding: 10,
    marginTop: 10
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  subheading: {
    color: "black",
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5
  },
  signInButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'rgba(123,104,238,0.8)',
    borderRadius: 5
  },
  signInText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  },
  

});

export default Login;
