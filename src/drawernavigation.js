import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from '@react-navigation/native';

import Details from "./details";
import Schedule from "./schedule";
import Attendance from "./Attendance";  
import Review from './Review';
import Logout from './logout'

const Drawer = createDrawerNavigator();

function MyDrawer() {
  const { colors } = useTheme();
  
  return (
    <Drawer.Navigator
      screenOptions={{
        activeTintColor: colors.text,
        inactiveTintColor: colors.text
      }}
    >
      
      <Drawer.Screen name="Schedule" component={Schedule} />
      <Drawer.Screen name="Attendance" component={Attendance} />
      <Drawer.Screen name= "Review" component={Review} />
      <Drawer.Screen name="Detail" component={Details} /> 
      <Drawer.Screen name= "Logout" component={Logout}/>
      
    </Drawer.Navigator>
  );
}

export default MyDrawer;
