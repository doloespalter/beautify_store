import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import headerLogo from "../assets/images/header-logo.png";


const WIDTH = Dimensions.get('window').width

export default class MenuButton extends React.Component {
    render() {
      return(
        <View style={styles.bar}>
          <Ionicons
              name="ios-menu"
              color="#000000"
              size={32}
              style={styles.menuIcon}
              onPress={()=> this.props.navigation.toggleDrawer()}
            />
            <Image source={headerLogo} style={styles.logo} />
          </View>
      );
    }
}


const styles = StyleSheet.create({
  bar:{
    position: 'absolute',
    top: 0, flex: 1,
    alignSelf: 'stretch',
    right: 0,
    left: 0,
    height: 80,
    backgroundColor: '#5BC3BF',
    zIndex: 200
  },
  logo: {
    position: "absolute",
    top: 45,
    left: WIDTH/2 - 48,
    width: 96,
    height: 28,
  },
  menuIcon: {
    position: "absolute",
    top: 41,
    left: 20,
    width: 25,
    height: 25,
    color: '#FFFFFF'
  },

});
