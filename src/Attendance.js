import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ImageBackground,Image,Text, TextInput,Button,DatePickerIOS} from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import{ useState } from 'react';
import axios from "./api/axios";

const Attendance = () => {
  const Drawer = createDrawerNavigator();
  const [date, setDate] = useState('');
  const [presentCount, setPresentCount] = useState('');
  const [absentCount, setAbsentCount] = useState('');
  const totalCount = parseInt(presentCount) + parseInt(absentCount);

    const handleSave = async(e) => {
      // Save attendance to database or API
      e.preventDefault();

      try{
        const response = await axios.post('/attendance', 
          JSON.stringify({
            date,
            presentCount,
            absentCount,
            totalCount
          }),
          {
            headers: { 'Content-Type': 'application/json'},
          })

        window.alert("Registration Successful!")
  
    
      }catch(error){
        window.alert(error)
      }
    
    };
    
    const handleAdd = () => {
      // Add new schedule
      console.log('Adding new schedule')
    };


  return (
    
      <View style={styles.container}>
       <Text style={{ color: 'white'}} >Date:</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={text => setDate(text)}
          placeholder="yyyy-mm-dd"
          placeholderTextColor="white"
          keyboardType='numeric'
        />
        <Text style={{ color: 'white'}} >Present:</Text>
        <TextInput
          placeholder="Enter the total no of present student"
          placeholderTextColor="white"
          style={styles.input}
          value={presentCount}
          onChangeText={text => setPresentCount(text)}
          keyboardType='numeric'
        />
        <Text style={{ color: 'white'}} >Absent:</Text>
        <TextInput
          placeholder="Enter the total number of absent student"
          placeholderTextColor="white"
          style={styles.input}
          value={absentCount}
          onChangeText={text => setAbsentCount(text)}
          keyboardType='numeric'
        />
        
        <Text style={{ color: 'white'}} >Total:</Text>
        <View style={styles.totalContainer}>
        <Text style={{ color: 'white'}} >{totalCount}</Text>
        </View>
          
           
          <View style={styles.buttonContainer}>
        <Button 
            title="Save" 
            onPress={handleSave} 
          />
        
        <Button 
        title="Add" 
        onPress={handleAdd}
        />
        </View>
      </View>
      
  )};

  const styles = StyleSheet.create({
    container: {
      backgroundColor:'black',
      padding: 20,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      width: '80%',
      color: "white",
      borderWidth: 1,
      borderColor: 'white',
      padding: 10,
      marginBottom: 20,
      borderRadius: 10,
    },
    
    text: {
      fontSize: 18,
      marginBottom: 20,
      color: "white"
    },
    buttonContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    totalContainer:{
      width: '80%',
      height:'10%',
      color: "white",
      borderWidth: 1,
      borderColor: 'white',
      padding: 10,
      marginBottom: 20,
      borderRadius: 10,
    },

    button: {
      width: '45%',
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
      
    export default Attendance;
