import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./login";
import MyDrawer from "./drawernavigation";
import Singup from "./signup";



const Stack = createNativeStackNavigator();

      const Navigator = () => {

        return(
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="signup" component={Singup}/>
              <Stack.Screen name="Login"component={Login}/>
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

      