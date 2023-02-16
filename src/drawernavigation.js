import { createDrawerNavigator } from '@react-navigation/drawer';

import Details from "./details";
import Schedule from "./schedule";
import Attendance from "./Attendance";  
import Review from './Review';


const Drawer = createDrawerNavigator();


function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Detail" component={Details} /> 
      <Drawer.Screen name="Schedule" component={Schedule} />
      <Drawer.Screen name="Attendance" component={Attendance} />
      <Drawer.Screen name= "Review" component={Review} />
      
    </Drawer.Navigator>
  );
}

export default MyDrawer;