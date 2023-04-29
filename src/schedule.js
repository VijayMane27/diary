import React, { useEffect } from "react";
import { useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import axios from "./api/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

const Schedule = () => {

  const navigation = useNavigation();

  const classes = ['FYIT', 'SYIT', 'TYIT'];

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [className, setClassName] = useState(classes[0]);
  const [displayCourses, setDisplayCourses] = useState([]);
  const [course, setCourse] = useState('');
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timePickerFor, setTimePickerFor] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    getData(classes[0]);
  }, [])

  // useFocusEffect(
  //   React.useCallback(() => {
  //     getData();
  //   }, [])
  // );

  const getData = async (itemValue) => {

    try {
      const SubjectResponse = await axios.get(`/Subject/Class/${itemValue}`, {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      });
      setDisplayCourses(SubjectResponse.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };



  const handleDateSelect = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleClassChange = (itemValue) => {
    setClassName(itemValue);
    getData(itemValue);
  };

  const timeFromPickerHandler = (event, selectedTime) => {
    if (selectedTime) {
      const formattedTime = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setTimeFrom(formattedTime);
    }
    setShowTimePicker(false);
  };

  const timeToPickerHandler = (event, selectedTime) => {
    if (selectedTime) {
      const formattedTime = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setTimeTo(formattedTime);
    }
    setShowTimePicker(false);
  };

  const showTimePickerHandler = (event, pickerFor) => {
    setShowTimePicker(true);
    setTimePickerFor(pickerFor);
  };

  const timeFromInputRef = useRef(null);
  const timeToInputRef = useRef(null);

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleTimeFromFocus = () => {
    timeFromInputRef.current.focus();
    hideKeyboard();
    showTimePickerHandler(null, 'timeFrom');
  };

  const handleTimeToFocus = () => {
    timeToInputRef.current.focus();
    hideKeyboard();
    showTimePickerHandler(null, 'timeTo');
  };


  const handleSave = async (e) => {
    // Save attendance to database or API
    e.preventDefault();

    const emailStr = await AsyncStorage.getItem('email')
    const email = JSON.parse(emailStr)

    // Parse hours and minutes from timeFrom and timeTo
    const fromParts = timeFrom.split(':');
    const toParts = timeTo.split(':');
    let fromHours = parseInt(fromParts[0], 10);
    let fromMinutes = parseInt(fromParts[1], 10);
    let toHours = parseInt(toParts[0], 10);
    let toMinutes = parseInt(toParts[1], 10);
    
    // Handle edge cases for 12:00 AM and 12:00 PM
    if (fromHours === 12 && timeFrom.includes('AM')) {
      fromHours = 0;
    }
    if (toHours === 12 && timeTo.includes('AM')) {
      toHours = 0;
    }
    if (fromHours !== 12 && timeFrom.includes('PM')) {
      fromHours += 12;
    }
    if (toHours !== 12 && timeTo.includes('PM')) {
      toHours += 12;
    }
    
    // Calculate difference in minutes
    const diff = ((toHours * 60) + toMinutes) - ((fromHours * 60) + fromMinutes);
    
    if (diff < 0 || diff > 300) { // Difference is negative or more than 5 hours
      window.alert("Invalid time range!")
      return;
    }
    
    try {
      const response = await axios.post('/schedule',
        JSON.stringify({
          email,
          date,
          className,
          timeFrom,
          timeTo,
          course,
          notes
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        })

      window.alert("Schedule Saved Successfully!")
      navigation.navigate('Attendance')

    } catch (error) {
      window.alert(error)
    }

  };

  const handleAdd = () => {
    setDate(new Date());
    setClassName(classes[0]);
    setTimeFrom('');
    setTimeTo('');
    setNotes('');
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
      <Text style={{ color: 'white' }} >Class:</Text>
      <View style={styles.picker}>
        <Picker
          style={styles.input}
          selectedValue={className}
          onValueChange={handleClassChange}
        >
          {classes.map((className) => (
            <Picker.Item key={className} label={className} value={className} />
          ))}
        </Picker>
      </View>
      <TouchableWithoutFeedback onPress={hideKeyboard}>
        <React.Fragment>
          <Text style={{ color: 'white' }}>TimeFrom</Text>
          <TextInput
            ref={timeFromInputRef}
            style={styles.input}
            placeholder="Time From (HH:mm)"
            placeholderTextColor="white"
            value={timeFrom}
            onChangeText={(text) => setTimeFrom(text)}
            onFocus={handleTimeFromFocus}
          />
          <Text style={{ color: 'white' }}>TimeTo</Text>
          <TextInput
            ref={timeToInputRef}
            style={styles.input}
            placeholder="Time To (HH:mm)"
            placeholderTextColor="white"
            value={timeTo}
            onChangeText={(text) => setTimeTo(text)}
            onFocus={handleTimeToFocus}
          />
          {showTimePicker && (
            <DateTimePicker
              testID={`${timePickerFor}Picker`}
              value={new Date()}
              mode={'time'}
              is24Hour={false}
              display="default"
              onChange={timePickerFor === 'timeFrom' ? timeFromPickerHandler : timeToPickerHandler}
            />
          )}
        </React.Fragment>
      </TouchableWithoutFeedback>
      <Text style={{ color: 'white' }} >Subject:</Text>
<View style={styles.picker}>
<Picker
  style={styles.input}
  onValueChange={(itemValue) => {
    setCourse(itemValue);
  }}
  selectedValue={course}
>
    {displayCourses.map((cou) => (
      <Picker.Item key={cou} label={cou} value={cou} />
    ))}
  </Picker>
</View>

      <Text style={{ color: 'white' }} >Notes</Text>
      <TextInput
        style={styles.input}
        placeholder="Notes"
        placeholderTextColor="white"
        value={notes}
        onChangeText={(text) => setNotes(text)}
      />


      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>SAVE</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.clearButton} onPress={handleAdd}>
        <Text style={styles.buttonText}>ADD NEW</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(17, 82, 96)',
    padding: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    padding: 20,

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
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,


  },
  timeInput: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '115%',
  },
  Text: {
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
  picker: {
    width: '80%',
    height: '8%',
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
  },


});


export default Schedule
