import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./login";
import MyDrawer from "./drawernavigation";
import Singup from "./signup";
import Splash from "./splash";
import AdminLogin from "./adminLogin";
import AdminPage from "./adminPage";
const Stack = createNativeStackNavigator();

const Navigator = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="signup" component={Singup} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Drawer" component={MyDrawer} options={{ headerShown: false }} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} options={{ headerShown: false }} />
        <Stack.Screen name="AdminPage" component={AdminPage} options={{ headerShown: false }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
