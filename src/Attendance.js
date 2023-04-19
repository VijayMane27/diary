import React from "react";
import { StyleSheet, View,Text, TextInput,Button,TouchableOpacity} from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import{ useState } from 'react';
import axios from "./api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';

const Attendance = () => {
  const Drawer = createDrawerNavigator();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [presentCount, setPresentCount] = useState('');
  const [absentCount, setAbsentCount] = useState('');
  const totalCount = parseInt(presentCount) + parseInt(absentCount);

  const handleDateSelect = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };
    const handleSave = async(e) => {
      // Save attendance to database or API
      e.preventDefault();

      const emailStr = await AsyncStorage.getItem('email')
      const email = JSON.parse(emailStr)

      try{
        const response = await axios.post('/attendance', 
          JSON.stringify({
            email,
            date,
            presentCount,
            absentCount,
            totalCount
          }),
          {
            headers: { 'Content-Type': 'application/json'},
          })

        window.alert("Attendance Saved Successfully!")

        await AsyncStorage.setItem('attendanceData', JSON.stringify((response.data)))
  
    
      }catch(error){
        window.alert(error)
      }
    
    };

    const handleAdd = () => {
    setDate(new Date());
    setPresentCount('');
    setAbsentCount('');
  };
    


  return (
    
        <View style={styles.container}>
        <Text style={{ color: 'white', margin: -20 }}>Date:</Text>
  <View style={styles.dateContainer}>
    <TouchableOpacity
      style={styles.dateInput}
      onPress={() => setShowDatePicker(true)}
    >
      <Text style={styles.dateText}>
        {date.toLocaleDateString('en-GB')}
      </Text>
    </TouchableOpacity>
  </View>
  {showDatePicker && (
    <DateTimePicker
      value={date}
      mode="date"
      display="default"
      onChange={handleDateSelect}
    />
  )}
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
          
           
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>SAVE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearButton} onPress={handleAdd}>
  <Text style={styles.buttonText}>ADD NEW</Text>
        </TouchableOpacity>

      </View>

      
      
  )};

  const styles = StyleSheet.create({
    container: {
      backgroundColor:'rgb(17, 82, 96)',
      padding: 20,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80%',
      padding:20,

    },
    dateInput: {
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 10,
      padding: 15,
      width: '115%',
    },
    dateText: {
      color: 'white',
      fontSize: 16,
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
      height:'7%',
      color: "white",
      borderWidth: 1,
      borderColor: 'white',
      padding: 10,
      marginBottom: 20,
      borderRadius: 10,
    },
    button: {
      backgroundColor: 'blue',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    clearButton: {
      backgroundColor: 'red',
      paddingVertical: 10,
      paddingHorizontal: 7,
      borderRadius: 5,
      marginTop: 20,
      alignSelf: 'center',
    }
  });
      
    export default Attendance;
