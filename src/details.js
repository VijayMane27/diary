import React from "react";
import { StyleSheet, View, ImageBackground,Image,Text, TextInput,Button, AsyncStorage,Alert} from 'react-native';
import{ useState } from 'react';
import { ScrollView } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import axios from "./api/axios";




const Details = () => {
  const departments = ['FYJC', 'SYJC', 'B.COM', 'B.SC', 'B.A'];
  
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [Department, setSelectedDepartment] = useState(departments[0]);
  const [qualification, setQualification] = useState('');
  const [dob, setDOB] = useState('');
  const [basicPay, setBasicPay] = useState('');
  const [languages, setLanguages] = useState('');
  const [employeeNo, setEmployeeNo] = useState('');
  const [aadharNo, setAadharNo] = useState('');
  const [panNo, setPanNo] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  const handleSave = async(e) => {
    // Save the data to a database or API here
    e.preventDefault();

      try{
        const response = await axios.post('/detail', 
          JSON.stringify({
            name,
            designation,
            Department,
            qualification,
            dob,
            basicPay,
            languages,
            employeeNo,
            aadharNo,
            panNo,
            phoneNo,
            address,
            bloodGroup
          }),
          {
            headers: { 'Content-Type': 'application/json'},
          })

        window.alert("Registration Successful!")
  
    
      }catch(error){
        window.alert(error)
      }
    
    };

  const handleUpdate = () => {
    // Update the data in the database or API here
  };

  return (
    <ScrollView>
        <View style={styles.container}>

          
        <Text style={{ color: 'white'}} >Name:</Text>
      <TextInput
        placeholder="Enter your name"
        placeholderTextColor="white"
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
      />

<Text style={{ color: 'white'}} >Designation:</Text>
      <TextInput
        placeholder="Enter your designation"
        placeholderTextColor="white"
        style={styles.input}
        value={designation}
        onChangeText={text => setDesignation(text)}
      />
 
 <Text style={{ color: 'white'}} >Department:</Text>
      <View style={styles.picker}>
      <Picker
         placeholder="Enter your department"
         placeholderTextColor="white"
        selectedValue={Department}
        onValueChange={itemValue => setSelectedDepartment(itemValue)}
       
      >
        {departments.map(department => (
          
          <Picker.Item key={department} label={department} value={department} />
        ))}
      </Picker>
      </View>

      <Text style={{ color: 'white'}} >Qualification:</Text>
      <TextInput
        placeholder="Enter your qualification"
        placeholderTextColor="white"
        style={styles.input}
        value={qualification}
        onChangeText={text => setQualification(text)}
      />

<Text style={{ color: 'white'}} >Date of Birth:</Text>
      <TextInput
        placeholder="Enter your date of birth"
        placeholderTextColor="white"
        style={styles.input}
        value={dob}
        keyboardType="number-pad"
        onChangeText={text => setDOB(text)}
      />

<Text style={{ color: 'white'}} >Basic Pay:</Text>
      <TextInput
      placeholder="Enter your basic pay"
      placeholderTextColor="white"
        style={styles.input}
        value={basicPay}
        keyboardType="number-pad"
        onChangeText={text => setBasicPay(text)}
      />

<Text style={{ color: 'white'}} >Languages Known:</Text>
      <TextInput
        placeholder="Languages known"
        placeholderTextColor="white"
        style={styles.input}
        value={languages}
        onChangeText={text => setLanguages(text)}
      />

<Text style={{ color: 'white'}} >Employee No:</Text>
      <TextInput
        placeholder="Enter your employee no "
        placeholderTextColor="white"
        style={styles.input}
        value={employeeNo}
        onChangeText={text => setEmployeeNo(text)}
      />

<Text style={{ color: 'white'}} >Aadhar No:</Text>
      <TextInput
        placeholder="Enter your aadhar no  "
        placeholderTextColor="white"
        style={styles.input}
        value={aadharNo}
        keyboardType="number-pad"
        maxLength={12}
        onChangeText={text => setAadharNo(text)}
      />

<Text style={{ color: 'white'}} >Pan No:</Text>
      <TextInput
        placeholder="Enter your pan no "
        placeholderTextColor="white"
        style={styles.input}
        value={panNo}
        onChangeText={text => setPanNo(text)}
      />

<Text style={{ color: 'white'}} >Phone No:</Text>
      <TextInput
        placeholder="Enter your phone no"
        placeholderTextColor="white"
        style={styles.input}
        value={phoneNo}
        keyboardType="number-pad"
        maxLength={10}
        onChangeText={text => setPhoneNo(text)}
      />
      <Text style={{ color: 'white'}} >Address:</Text>
      <TextInput
        placeholder="Enter your address"
        placeholderTextColor="white"
        style={styles.input}
        value={address}
        onChangeText={text => setAddress(text)}
      />

<Text style={{ color: 'white'}} >Blood Group:</Text>
      <TextInput
        placeholder="Enter your blood group"
        placeholderTextColor="white"
        style={styles.input}
        value={bloodGroup}
        onChangeText={text => setBloodGroup(text)}
      />

      <View style={styles.buttonContainer}>
      <Button 
        title="Save" 
        onPress={handleSave} 
      />
      <Button 
        title="Update" 
        onPress={handleUpdate} 
      />
      </View>
      </View>
      </ScrollView>
    
  )};
      
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(0,0,0,0.9)',
      padding: 40,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      borderColor: 'white',
      borderWidth: 2,
      shadowColor: 'white',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 5,
    },
    input: {
      width: '80%',
      color: 'white',
      fontSize: 16,
      fontFamily: 'Arial',
      borderWidth: 2,
      borderColor: 'white',
      padding: 12,
      marginBottom: 20,
      borderRadius: 10,
    },
    picker: {
      width: '80%',
      height: '5%',
      marginBottom: 20,
      borderRadius: 10,
      borderWidth: 2,
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
    totalContainer: {
      width: '80%',
      height: '10%',
      color: 'white',
      fontSize: 24,
      fontFamily: 'Arial',
      borderWidth: 2,
      borderColor: 'white',
      padding: 12,
      marginBottom: 20,
      borderRadius: 10,
    },
    button: {
      width: '45%',
      backgroundColor: 'white',
      padding: 14,
      borderRadius: 5,
    },
    buttonText: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  
  
    
    
    
    
    export default Details;