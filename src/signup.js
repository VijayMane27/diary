import React, { useState, useEffect } from 'react';
import {View,Text, StyleSheet, TextInput,TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from "./api/axios";
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native';

const Singup = () => {

  
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [qualification, setQualification] = useState('');
  const [dob, setDOB] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [basicPay, setBasicPay] = useState('');
  const [languages, setLanguages] = useState('');
  const [employeeNo, setEmployeeNo] = useState('');
  const [aadharNo, setAadharNo] = useState('');
  const [panNo, setPanNo] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  const handleDateSelect = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(false);
    setDOB(currentDate);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (aadharNo.length !== 12) {
      window.alert("Aadhar number must be exactly 12 digits");
      return;
    }
    if (panNo.length !== 10) {
      window.alert("Pan number must be exactly 10 digits");
      return;
    }
    if (phoneNo.length !== 10) {
      window.alert("Phone number must be exactly 10 digits");
      return;
    }

    const currentYear = new Date().getFullYear();
    const dobYear = dob.getFullYear();
    const age = currentYear - dobYear;

    if (age < 21) {
      window.alert("You must be at least 21 years old to register.");
      return;
    }

    try{
      const response = await axios.post('/users', 
        JSON.stringify({
          "email": email,
          'password': password,
          'name': name,
          'designation':designation,
          'qualification':qualification,
          'dob':dob,
          'basicPay':basicPay,
          'languages':languages,
          'employeeNo':employeeNo,
          'aadharNo':aadharNo,
          'panNo':panNo,
          'phoneNo':phoneNo,
          'address':address,
          'bloodGroup':bloodGroup
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
 <ScrollView>
  <View style={styles.container}>
  <Text style={styles.label}>Name:</Text>
  <TextInput
    value={name}
    onChangeText={text => setName(text)}
    style={styles.input}
  />
  <Text style={styles.label}>Email</Text>
  <TextInput
    value={email}
    onChangeText={text => setEmail(text)}
    style={styles.input}
  />
  <Text style={styles.label}>Password</Text>
  <TextInput
    secureTextEntry={true}
    value={password}
    onChangeText={text => setPassword(text)}
    style={styles.input}
  />
  <Text style={styles.label}>Designation:</Text>
  <TextInput
    value={designation}
    onChangeText={text => setDesignation(text)}
    style={styles.input}
  />
  <Text style={styles.label}>Qualification:</Text>
  <TextInput
    value={qualification}
    onChangeText={text => setQualification(text)}
    style={styles.input}
  />
  <Text style={styles.label}>Date of Birth:</Text>
  <TouchableOpacity onPress={() => setShowDatePicker(true)}>
    <TextInput
      value={dob.toISOString().substring(0, 10)}
      keyboardType="numeric"
      editable={false}
      style={styles.input}
    />
    {showDatePicker && (
      <DateTimePicker
        value={dob}
        mode="date"
        display="default"
        onChange={handleDateSelect}
      />
    )}
  </TouchableOpacity>
  <Text style={styles.label}>Basic Pay:</Text>
  <TextInput
    value={basicPay}
    keyboardType="number-pad"
    onChangeText={text => setBasicPay(text)}
    style={styles.input}
  />
  <Text style={styles.label} >Languages Known:</Text>
  <TextInput
    value={languages}
    onChangeText={text => setLanguages(text)}
    style={styles.input}
  />
  <Text style={styles.label} >Employee Number:</Text>
  <TextInput
    value={employeeNo}
    onChangeText={text => setEmployeeNo(text)}
    style={styles.input}
  />
  <Text style={styles.label} >Aadhar Number:</Text>
  <TextInput
    value={aadharNo}
    keyboardType="number-pad"
    maxLength={12}
    onChangeText={text => setAadharNo(text)}
    style={styles.input}
  />
          <Text style={styles.label} >Pan Number:</Text>
        <TextInput
          value={panNo}
          maxLength={10}
          onChangeText={text => setPanNo(text)}
          style={styles.input}
        />
        <Text style={styles.label} >Phone Number:</Text>
        <TextInput
          value={phoneNo}
          keyboardType="number-pad"
          maxLength={10}
          onChangeText={text => setPhoneNo(text)}
          style={styles.input}
        />
         <Text style={styles.label} >Address:</Text>
        <TextInput
          value={address}
          onChangeText={text => setAddress(text)}
          style={styles.input}
        />
        <Text style={styles.label} >Blood Group:</Text>
        <TextInput
          value={bloodGroup}
          onChangeText={text => setBloodGroup(text)}
          style={styles.input}
        />
  
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      </View>
  
    </ScrollView>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(17, 82, 96)',
    padding: 20,
  },
  label: {
    marginTop: 20,
    color: 'white',
  },
  input: {
    backgroundColor: 'white',
    color:'black',
    height: 40,
    borderRadius: 2,
    paddingHorizontal: 10,
    padding: 12,
  },
  text: {
    marginTop: 20,
    color: 'black',
  },
  textCenter: {
    textAlign: 'center',
  },
  textBox: {
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});


export default Singup;
