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
import { Ionicons } from '@expo/vector-icons';
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


import { connect } from 'react-redux';
import { removeUserToken } from '../actions/AuthActions';

class LoggedInDrawer extends React.Component {

  navLink(nav, text, iconName){
    return(
      <TouchableOpacity
         style={{flex: 1, height: 50}}
         onPress={() => { this.props.navigation.navigate(nav) }}
       >
        <View style={styles.listStyle}>
          <Ionicons
            name = {iconName}
            size = {30}/>
          <Text style={styles.link}>{text}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render(){
    const { user,name, storeId } = this.props;
    return(
             <View style={styles.container}>
               <View style={styles.userInfo}>
                   <Image style={styles.img} source={require('../assets/images/profilepic.jpg')} />
                   <Text style={styles.name}> Bienvenido </Text>
               </View>
               <ScrollView>
                 <View style={styles.navLinks}>
                     {this.navLink('Home','Home', 'ios-home')}
                     {this.navLink('MyAppointments','Mis citas', 'ios-calendar')}
                     {this.navLink('','Centros favoritos', 'ios-heart')}
                     {this.navLink('Profile','Mi cuenta', 'ios-person')}
                 </View>
               </ScrollView>
               <View style={styles.logout}>
                 <TouchableOpacity onPress={this._signOutAsync} >
                    <Text style={styles.link}>  Cerrar sesion </Text>
                  </TouchableOpacity>
               </View>
            </View>
    );
  }

  _signOutAsync =  () => {
       this.props.removeUserToken()
           .then(() => {
             this.props.navigation.navigate('Login');
             console.log("removed");
           })
           .catch(error => {
               this.setState({ error })
           })
   };

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 20,
    marginTop: 10,
    paddingBottom: 5,
    color: 'black',
    textAlign: 'left',
    fontWeight: 'bold'
  },
  img:{
    height: 130,
    width: 130,
    borderRadius: 65,
    marginTop: 40,
  },
  userInfo:{
    height: 200,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  navLinks:{
    flex:1,
    backgroundColor: 'white',
    paddingTop: 30,
    paddingBottom: 45,
    color: 'black'
  },
  link: {
    fontSize: 18,
    padding: 6,
    margin: 5,
    textAlign: 'left',
  },
  logout:{
    backgroundColor: 'white',
    height: 50,
  },
  listStyle:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    left: 20
  }
})


const mapStateToProps = state => ({
    token: state.auth.token,
    user: state.user.userDetails,
    name: state.user.userDetails.name,
    storeId: state.auth.storeId
});


const mapDispatchToProps = dispatch => ({
    removeUserToken: () => dispatch(removeUserToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInDrawer);
