import React from 'react';

import HomeScreen from "./screens/HomeScreen";
import DrawerNavigator from './navigation/DrawerNavigator';
import Toast from 'react-native-root-toast';
//import MyProvider from './Provider';
import { Provider } from 'react-redux';
import {
  Notifications,
} from 'expo';
import store from './store';
import Reactotron from 'reactotron-react-native'


import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';



export default class App extends React.Component {

  componentDidMount(){
    this._notificationSubscription = Notifications.addListener(this._handleNotification);

    Reactotron
      .configure() // controls connection & communication settings
      .useReactNative() // add all built-in react native plugins
      .connect() // let's connect!

      Reactotron.log('hello rendering world')
  }

  _handleNotification = (notification) => {
    this.setState({notification: notification});
        let toast = Toast.show(notification.data.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
    });
  };


  render() {
    console.disableYellowBox = true;
    return(
       <Provider store = { store }>
          <DrawerNavigator />
       </Provider>
    );
  }
}
