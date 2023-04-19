import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./login";
import MyDrawer from "./drawernavigation";
import Singup from "./signup";
import Splash from "./splash";


const Stack = createNativeStackNavigator();

      const Navigator = () => {

        return(
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
              <Stack.Screen name="Splash" component={Splash}
               options={{
                headerShown: false // hide the header for this screen
              }} />
              <Stack.Screen name="signup" component={Singup}/>
              <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false // hide the header for this screen
          }}
        />
              <Stack.Screen name="Drawer" component={MyDrawer}
                options={{
                  headerShown:false
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        )
      }

      export default Navigator

      