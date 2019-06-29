import React from 'react';
import {
  TouchableOpacity,
  Platform,
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LoggedInDrawer from './LoggedInDrawer';
//import { MyContext } from '../Provider';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

import { connect } from 'react-redux';

class MenuDrawer extends React.Component {

  componentDidMount() {
  }

  render(){
    let drawer = <LoggedInDrawer navigation={this.props.navigation} />;
    return(
        <View style={styles.container}>
          {drawer}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  }
})

const mapStateToProps = state => ({
    token: state.auth.token,
    loggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps)(MenuDrawer);
