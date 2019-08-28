import React from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getUserToken, getStoreIdAction } from '../actions/AuthActions';
import { fetchUserDetails } from '../actions/UserActions';
import { AsyncStorage } from 'react-native';
import { Font } from 'expo';
import headerLogo from "../assets/images/logo-splash.png";
import { Permissions, Notifications } from 'expo';


class SplashScreen extends React.Component {

  async componentDidMount() {
    await this.registerForPushNotificationsAsync();
    await this.props.getStoreIdAction();
    await Font.loadAsync({
      'open-sans': require('../assets/fonts/OpenSans.ttf'),
      'open-sans-bold': require('../assets/fonts/OpenSans-Bold.otf'),
      'open-sans-light': require('../assets/fonts/OpenSans-Light.ttf'),
    });
    this._bootstrapAsync();
  }

  _bootstrapAsync = () => {
       this.props.getUserToken().then(() => {
          if(this.props.loggedIn){
           this.props.fetchUserDetails(this.props.token);
           this.props.navigation.navigate('App');
         } else {
           this.props.navigation.navigate('Login');
         }
          })
           .catch(error => {
              console.log(error);
               this.setState({ error })
           })
   };

  async registerForPushNotificationsAsync(){

     const token = await AsyncStorage.getItem('notificationToken');

     if(!token){
       const { status: existingStatus } = await Permissions.getAsync(
         Permissions.NOTIFICATIONS
       );
       let finalStatus = existingStatus;
       if (existingStatus !== 'granted') {
         const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
         finalStatus = status;
       }

       if (finalStatus !== 'granted') {
         return;
       }

       let token = await Notifications.getExpoPushTokenAsync();
       AsyncStorage.setItem('notificationToken', token);
     }
   }




  render() {
    return (
      <View style={styles.viewStyles}>
        <Image source={headerLogo} style={styles.logo} />
        <ActivityIndicator size="large" animating={true} color="white" />
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5BC3BF'
  },
  logo: {
    width: 250,
    height: 50,
    marginBottom: 20
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    hasNotificationToken: state.user.hasNotificationToken,
    loggedIn: state.auth.loggedIn
});


const mapDispatchToProps = dispatch => ({
    getUserToken: () => dispatch(getUserToken()),
    getStoreIdAction: () => dispatch(getStoreIdAction()),
    fetchUserDetails: (userToken) => dispatch(fetchUserDetails(userToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
