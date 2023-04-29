
import { StyleSheet, View, ImageBackground, Image, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import axios from "./api/axios";
import DateTimePicker from '@react-native-community/datetimepicker';
import { color } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const Details = (props) => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    designation:'',
    qualification:'',
    dob:'',
    basicPay:'',
    languages:'',
    employeeNo:'',
    aadharNo:'',
    panNo:'',
    phoneNo:'',
    address:'',
    bloodGroup:''    
  });

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );



  
  const getData = async () => {

    const emailStr = await AsyncStorage.getItem('email')
    const email = JSON.parse(emailStr)

    try {

      const detailResponse = await axios.get(`/users/${email}`, {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      });
      const details = detailResponse.data;

      setEmployeeData({
        name: details[0].name,
        designation:details[0].designation,
        qualification:details[0].qualification,
        dob:details[0].dob,
        basicPay:details[0].basicPay,
        languages:details[0].languages,
        employeeNo:details[0].employeeNo,
        aadharNo:details[0].aadharNo,
        panNo:details[0].aadharNo,
        phoneNo:details[0].phoneNo,
        address:details[0].address,
        bloodGroup:details[0].bloodGroup    
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };


  useEffect(() => {
    // Assuming props.route.params contains the data from the GET request
    getData()
  }, []);

  return (
    <View style={styles.container}>
    <Text style={styles.heading}>Teacher's Personal Details</Text>
    <ScrollView>
      <View style={styles.box}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{employeeData?.name}</Text>
      
        <Text style={styles.label}>Designation:</Text>
        <Text style={styles.value}>{employeeData?.designation}</Text>
      
        <Text style={styles.label}>Department:</Text>
         <Text style={styles.value}>INFORMATION TECNOLOGY</Text> 
      
        <Text style={styles.label}>Qualification:</Text>
        <Text style={styles.value}>{employeeData?.qualification}</Text>
      
        <Text style={styles.label}>Date of Birth:</Text>
        <Text style={styles.value}>{formatDate(employeeData?.dob)}</Text>
      
        <Text style={styles.label}>Basic Pay:</Text>
        <Text style={styles.value}>{employeeData?.basicPay}</Text>
      
        <Text style={styles.label}>Languages:</Text>
        <Text style={styles.value}>{employeeData?.languages}</Text>
      
        <Text style={styles.label}>Employee Number:</Text>
        <Text style={styles.value}>{employeeData?.employeeNo}</Text>
      
        <Text style={styles.label}>Aadhar Number:</Text>
        <Text style={styles.value}>{employeeData?.aadharNo}</Text>
      
        <Text style={styles.label}>PAN Number:</Text>
        <Text style={styles.value}>{employeeData?.panNo}</Text>
      
        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{employeeData?.phoneNo}</Text>
      
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{employeeData?.address}</Text>
      
        <Text style={styles.label}>Blood Group:</Text>
        <Text style={styles.value}>{employeeData?.bloodGroup}</Text>
      </View>
    </ScrollView>
  </View>
  )
};
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'rgb(17, 82, 96)',
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 10,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      color: 'pink'
    },
    box: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 20,
      paddingHorizontal: 30,
      paddingVertical: 30,
      marginVertical: 10
    },
    label: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical:15
    },
    value: {
      fontSize: 20,
      marginBottom: 5,
      textDecorationLine: 'underline',
    }
  });
  

export default Details;