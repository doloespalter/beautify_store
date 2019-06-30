import React from 'react';
import {Platform, Dimensions} from 'react-native';
import { createDrawerNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import MenuDrawer from '../components/MenuDrawer';
import ProfileScreen from "../screens/ProfileScreen";
import MyAppointmentsScreen from "../screens/MyAppointmentsScreen";
import PendingAppointmentsScreen from "../screens/PendingAppointmentsScreen";


const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
  drawerWidth: WIDTH*0.83,
  contentComponent: ({ navigation}) => {
    return(
      <MenuDrawer navigation={navigation}/>
    )
  }
}

const DrawerNavigator = createDrawerNavigator(
  {
    PendingAppointments: {
      screen: PendingAppointmentsScreen
    },
    MyAppointments: {
      screen: MyAppointmentsScreen
    },
    Home: {
      screen: HomeScreen
    },
    Login:{
      screen: LoginScreen
    },
    SplashScreen: {
      screen: LoginScreen
    },

  },
  DrawerConfig
);

const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: DrawerNavigator
});

export default createAppContainer(InitialNavigator);
