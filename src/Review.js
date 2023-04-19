import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import axios from './api/axios';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { useFocusEffect } from '@react-navigation/native';

const Review = () => {
  const Drawer = createDrawerNavigator();
  const [schedules, setReviews] = useState([]);
  const [attendances, setAttendnaces] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {

    const emailStr = await AsyncStorage.getItem('email')
    const email = JSON.parse(emailStr)
  
    try {
  
      const attendanceResponse = await axios.get(`/attendance/${email}`, {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      });
      const scheduleResponse = await axios.get(`/schedule/${email}`,
      {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      });
  
      const attendance = attendanceResponse.data;
      const schedule = scheduleResponse.data;
  
      // sort schedules and attendances in reverse chronological order based on date
      const sortedSchedules = schedule.sort((a, b) => new Date(b.date) - new Date(a.date));
      const sortedAttendances = attendance.sort((a, b) => new Date(b.date) - new Date(a.date));
  
      setReviews(sortedSchedules);
      setAttendnaces(sortedAttendances);
    } catch (error) {
      console.log(error);
    }
  };
  
  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  const generatePDF = async (attendances, schedules) => {
    let tableRows = '';
    schedules.forEach((schedule, id) => {
      const attendance = attendances[id];
      const dateObj = new Date(attendance?.date);
      const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
      tableRows += `
        <tr>
          <td>${formattedDate}</td>
          <td>${schedule.className}</td>
          <td>${schedule.timeFrom}</td>
          <td>${schedule.timeTo}</td>
          <td>${schedule.course}</td>
          <td>${schedule.notes}</td>
          <td>${attendance?.presentCount}</td>
          <td>${attendance?.absentCount}</td>
          <td>${attendance?.totalCount}</td>
        </tr>
      `;
    });
  
    const html = `
      <html>
        <head>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
              font-size: 11px;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h2>REVIEW TABLE</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Class</th>
                <th>Time From</th>
                <th>Time To</th>
                <th>Course</th>
                <th>Notes</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </body>
      </html>
    `;
    
    const options = {
      html,
      fileName: 'review.pdf',
      directory: 'Documents',
    };
  
    try {
      const file = await RNHTMLtoPDF.convert(options);
      console.log('PDF file:', file.filePath);
      return true; // PDF generated successfully
    } catch (error) {
      console.error('Error generating PDF:', error);
      return false; // PDF generation failed
    }
  };
  
  // Call generatePDF function and display a message to the user based on the returned value
  const downloadPDF = async () => {
    const success = await generatePDF(attendances, schedules, 0); 
    if (success) {
      alert('Download successful!');
    } else {
      alert('Download failed. Please try again.');
    }
  };

  const clearData = () => {
    setReviews([]);
    setAttendances([]);
  };

  return (
  
     <ScrollView backgroundColor='rgb(17, 82, 96)'>
      <View style={styles.container}>
        <Text style={styles.header}>Review Table</Text>
        <View style={styles.table}>
          <View style={styles.row}>
          <Text style={[styles.column, styles.boldColumn,{ color: 'pink' }]}>Date</Text>
          <Text style={[styles.column, styles.boldColumn,{ color: 'pink' }]}>Class</Text>
          <Text style={[styles.column, styles.boldColumn,{ color: 'pink' }]}>Time From</Text>
          <Text style={[styles.column, styles.boldColumn,{ color: 'pink' }]}>Time To</Text>
          <Text style={[styles.column, styles.boldColumn,{ color: 'pink' }]}>Course</Text>
          <Text style={[styles.column, styles.boldColumn,{ color: 'pink' }]}>Notes</Text>
          <Text style={[styles.column, styles.boldColumn,{ color: 'pink' }]}>Present</Text>
          <Text style={[styles.column, styles.boldColumn,{ color: 'pink' }]}>Absent</Text>
          <Text style={[styles.column, styles.boldColumn,{ color: 'pink' }]}>Total</Text>
         
          </View>
          {schedules.map((item, id) =>{
        const attendance = attendances[id];
        const dateObj = new Date(attendance?.date);
        const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
        return (
          <View key={id} style={styles.row}>
            <Text style={styles.column}>{formattedDate}</Text>
            <Text style={styles.column}>{item.className}</Text>
            <Text style={styles.column}>{item.timeFrom}</Text>
            <Text style={styles.column}>{item.timeTo}</Text>
            <Text style={styles.column}>{item.course}</Text>
            <Text style={styles.column}>{item.notes}</Text>
            <Text style={styles.column}>{attendance?.presentCount}</Text>
            <Text style={styles.column}>{attendance?.absentCount}</Text>
            <Text style={styles.column}>{attendance?.totalCount}</Text>
              </View>
            );
          })}
        </View>
        <TouchableOpacity style={styles.button} onPress={downloadPDF}>
          <Text style={styles.buttonText}>Download PDF</Text>
</TouchableOpacity>
      </View>
    </ScrollView>
  
  );
};


  const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'rgb(17, 82, 96)'
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    table: {
      width: '100%',
      borderWidth: 1,
      borderColor: 'black',
      marginTop: 20,
      marginBottom: 20,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      borderColor: 'white',
      borderWidth: 1
    },
    column: {
      flex: 1,
      padding: 10,
      textAlign: 'center',
      borderColor: 'white',
      borderWidth: 1,
      fontSize:8
    },
    boldColumn: {
      fontWeight: 'bold',
      fontSize:7  
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  

export default Review;
