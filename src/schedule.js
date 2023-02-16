import React from "react";
import { StatusBar } from 'expo-status-bar';
import{ useState } from 'react';
import { StyleSheet, View, ImageBackground,Image,Text, TextInput,Button} from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Picker } from "@react-native-picker/picker";
import Review from "./Review";
import { ScrollView } from "react-native-gesture-handler";
import axios from "./api/axios";

const Schedule = () => {
  
  const Drawer = createDrawerNavigator();

  const classes = ['FYJC', 'SYJC', 'B.A', 'B.COM', 'B.SC'];
  const courses = ['ARTS', 'SCIENCE', 'COMMERCE', 'IT', 'BT', 'BBA', 'BBI'];


  const [date, setDate] = useState('');
  const [className, setClassName] = useState(classes[0]);
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [course, setCourse] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = async(e)=> {
    // Save attendance to database or API
    e.preventDefault();

    try{
      const response = await axios.post('/schedule', 
        JSON.stringify({
          date,
          className,
          timeFrom,
          timeTo,
          course,
          notes  
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
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ color: 'white'}} >Date</Text>
        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD)"
          placeholderTextColor="white"
          value={date}
          keyboardType='numeric'
          onChangeText={(text) => setDate(text)}
        />
        <Text style={{ color: 'white'}} >Class:</Text>
        <View style={styles.picker}>
          <Picker
            style={styles.input}
            selectedValue={className}
            onValueChange={itemValue => setClassName(itemValue)}
          >
            {classes.map(className => (
              <Picker.Item
                key={className}
                label={className}
                value={className}
              />
            ))}
          </Picker>
        </View>
        <Text style={{ color: 'white'}} >TimeFrom</Text>
        <TextInput
          style={styles.input}
          placeholder="Time From (HH:mm)"
          placeholderTextColor="white"
          value={timeFrom}
          onChangeText={(text) => setTimeFrom(text)}
        />
        <Text style={{ color: 'white'}} >TimeTo</Text>
        <TextInput
          style={styles.input}
          placeholder="Time To (HH:mm)"
          placeholderTextColor="white"
          value={timeTo}
          onChangeText={(text) => setTimeTo(text)}
        />
        <Text style={{ color: 'white'}} >Course:</Text>
        <View style={styles.picker}>
          <Picker
            style={styles.input}
            selectedValue={course}
            onValueChange={itemValue => setCourse(itemValue)}
          >
          {courses.map(course => (
          <Picker.Item key={course} label={course} value={course} />
        ))}
      </Picker>
      </View>
      <Text style={{ color: 'white'}} >Notes</Text>
          <TextInput
            style={styles.input}
            placeholder="Notes"
            placeholderTextColor="white"
            value={notes}
            onChangeText={(text) => setNotes(text)}
          />


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
        </ScrollView>
      );
    };
    
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
      picker: {
        width: '80%',
        height :'8%',
      marginBottom: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'white',
      shadowColor: 'white',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      },
      buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
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

    
    export default Schedule
