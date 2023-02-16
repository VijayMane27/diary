import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import axios from './api/axios';


const Review = () => {
    
    const Drawer = createDrawerNavigator();
    const [review, setReview] = useState({
      date: "",
      class: "",
      timeFrom: "",
      timeTo: "",
      course: "",
      present: "",
      absent: "",
      total: "",
      notes: ""
    });

   // useEffect(() => {
    //  getAttendance()
   // }, []);

   // const getAttendance = async() => {
     // try {
  
       // const response = await axios.get(`/attendance`, 
          //  {
          //      headers: { 'Content-Type': 'application/json', 'Accept' : 'application/json' },
           // })

       // console.log(response)
      
     // } catch (error) {
       // console.log(error)
     // }
   // }


    return (
      <View style={styles.container}>
        <Text style={styles.header}>Review Table</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.column}>Date</Text>
            <Text style={styles.column}>Class</Text>
            <Text style={styles.column}>Time From</Text>
            <Text style={styles.column}>Time To</Text>
            <Text style={styles.column}>Course</Text>
            <Text style={styles.column}>Present</Text>
            <Text style={styles.column}>Absent</Text>
            <Text style={styles.column}>Total</Text>
            <Text style={styles.column}>Notes</Text>
          </View>
          {reviews.map((review, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.column}>{review.date}</Text>
              <Text style={styles.column}>{review.class}</Text>
              <Text style={styles.column}>{review.timeFrom}</Text>
              <Text style={styles.column}>{review.timeTo}</Text>
              <Text style={styles.column}>{review.course}</Text>
              <Text style={styles.column}>{review.present}</Text>
              <Text style={styles.column}>{review.absent}</Text>
              <Text style={styles.column}>{review.total}</Text>
              <Text style={styles.column}>{review.notes}</Text>
            </View>

            
          ))}
         </View>
      <TouchableOpacity
        style={styles.button}
        //onPress={handleDownloadPDF}
      >
        <Text style={styles.buttonText}>Download PDF</Text>
      </TouchableOpacity>
    </View>
    );
  };


  const styles = StyleSheet.create({
    container: {
      backgroundColor:'black',
      flex: 1,
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    table: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    column: {
      color:'white',
      fontSize:11,
      flex: 1,
      textAlign: 'center',
    },
    button: {
      backgroundColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  

export default Review;
