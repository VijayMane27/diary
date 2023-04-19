import React, { useEffect } from 'react';
import { StyleSheet,View, Text, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        navigation.replace('Drawer');
      } else {
        navigation.replace('Login');
      }
    } catch (e) {
      console.log(e);
      navigation.replace('Login');
    }
  };

  return (
    <ImageBackground
      style={styles.imageBackground}
      source={require('../assets/splash.png')}
      resizeMode="contain"
    >
      <View style={styles.container}>
        <Text style={styles.text}>
          Welcome to Teacher's Diary App
        </Text>

        <Text style={styles.loadingText}>
          Loading...
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    backgroundColor:'rgba(17,121,105,255)',
    flex: 1,
    height: '100%',
    width: '100%',
  },
  container: {
    backgroundColor: 'rgb(17, 82, 96)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingText: {
    fontFamily: 'Arial',
    fontSize: 25,
    color: '#FFFFFF',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
});


export default Splash;
