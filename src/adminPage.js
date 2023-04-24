import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text , TouchableOpacity} from 'react-native';
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from './api/axios';

const AdminPage = () => {
  const [classValue, setClassValue] = useState('FYIT');
  const [subjectValue, setSubjectValue] = useState('');

  const handleAdd = async () => {
    // create a subject object with the class and subject values
    const newSubject = {
      Class: classValue,
      NAME: subjectValue
    };
  
    // post the new subject to the server
    try {
      const response = await axios.post('/Subject', newSubject);
      // log the response data or do something else
      console.log(response.data);
      // show alert for success
      window.alert('Subject added successfully');
    } catch (error) {
      console.log(error);
      // show alert for error
      window.alert('Something went wrong, please try again');
    }
    // clear the subject input
    setSubjectValue('');
  };
  
  const handleDelete = async () => {
    // send a delete request to the server with the subject id
    try {
      const response = await axios.delete(`/Subject/${subjectValue}`);
      // log the response data or do something else
      console.log(response.data);
      window.alert("Deleted Successfully");
    } catch (error) {
      window.alert(error);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.label}>Class</Text>
    <Picker
      selectedValue={classValue}
      onValueChange={(itemValue, itemIndex) => setClassValue(itemValue)}
      style={styles.picker}
      itemStyle={styles.pickerItem}
    >
      <Picker.Item label="FYIT" value="FYIT" />
      <Picker.Item label="SYIT" value="SYIT" />
      <Picker.Item label="TYIT" value="TYIT" />
    </Picker>
    <Text style={styles.label}>Subject</Text>
    <TextInput
      style={styles.input}
      onChangeText={text => setSubjectValue(text)}
      value={subjectValue}
    />
    <TouchableOpacity style={styles.button} onPress={handleAdd}>
      <Text style={styles.buttonText}>Add</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={handleDelete}>
      <Text style={styles.buttonText}>Delete</Text>
    </TouchableOpacity>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  backgroundColor:'rgb(17, 82, 96)'
},
label: {
  fontSize: 18,
  fontWeight: 'bold',
  marginTop: 20,
  color:'white'
},
input: {
  borderWidth: 1,
  borderColor: 'white',
  borderRadius: 5,
  width: '100%',
  height: 40,
  padding: 10,
  marginTop: 10,
  marginBottom: 20,
},
button: {
  backgroundColor: '#0066cc',
  borderRadius: 5,
  paddingVertical: 10,
  paddingHorizontal: 20,
  marginTop: 20,
},
buttonText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
},
pickerContainer: {
  borderWidth: 11,
  borderColor: 'white',
  borderRadius: 5,
  width: '100%',
  height: 40,
  marginTop: 10,
  marginBottom: 20,
},
picker: {
  height: 40,
  width: '100%',
  color: 'white',
},
pickerItem: {
  color: 'white',
},
});

export default AdminPage;
