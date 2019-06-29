import * as React from "react";
import { Image, KeyboardAvoidingView, StyleSheet, View, Dimensions, TextInput, ImageBackground , TouchableOpacity, Text, ScrollView} from "react-native";
import { createStackNavigator  } from 'react-navigation';

import MenuButton from '../components/MenuButton';
import DividerView from '../components/DividerView';
import strings from "../constants/Strings";
import colors from "../constants/Colors";
import response_types from "../constants/response_types"
import { OK } from "../constants/response_types";
import { Ionicons } from '@expo/vector-icons';
import {Alert} from 'react-native';

import UserService from '../services/UserService';
import { connect } from 'react-redux';
import { updateUserDetails } from '../actions/UserActions';

import {NavigationEvents} from 'react-navigation';
import LoadingIndicator from '../components/LoadingIndicator';


const WIDTH = Dimensions.get('window').width;

class ProfileScreen extends React.Component {

  state = {
    name: "",
    address: "",
    phone: "",
    id: "",
    email: "",
    displayButton: false
  }

  componentDidMount(){
    this.setState({
      name: this.props.userDetails.name,
      address: this.props.userDetails.address,
      phone: this.props.userDetails.phone,
      id: this.props.userDetails.id,
      email: this.props.userDetails.email
    })
  }

  reloadScreenData(){
    this.setState({
      name: this.props.userDetails.name,
      address: this.props.userDetails.address,
      phone: this.props.userDetails.phone,
      id: this.props.userDetails.id,
      email: this.props.userDetails.email
    })
  }

  handleSubmitChangesPress = () => {
    this.props.updateUserDetails({userInfo: this.state, userToken: this.props.userToken}).then(() => {
      Alert.alert('Datos actualizados');
    });
  };

  goToChangePassword = () => {
    this.props.navigation.navigate('ChangePassword');
  }

  renderButton = () => {
    if(this.state.displayButton){
      return (
        <TouchableOpacity style={styles.btnLogin} onPress={this.handleSubmitChangesPress}>
          <Text style={styles.saveText}>{strings.SAVE_CHANGES}</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  setButtonState = (value) => {
    this.setState({displayButton: value});
  };

  render(){
    const { userDetails } = this.props;
    const { name, address, phone } = this.state;
    return(
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <NavigationEvents onDidFocus={() => this.reloadScreenData()} />
          <View style={{flex:1}}>
            <MenuButton navigation={this.props.navigation}/>
            <ScrollView>
              <View style={styles.userInfo}>
                    <Image style={styles.img} source={require('../assets/images/profilepic.jpg')} />
                    <Text style={styles.name}> {this.state.name} </Text>
                    <Text style={styles.email}> {this.state.email} </Text>
              </View>
              <DividerView />
              <View style={styles.dataToEdit}>
                <Text style={styles.text}>Nombre: </Text>
                <View style={styles.inputContainer}>
                <TextInput
                  value={this.state.name}
                  onChangeText = {name => this.setState({ name })}
                  style = {styles.input}
                  onFocus = {a => this.setButtonState(true)}
                  onBlur = {a => this.setButtonState(false)}
                  />
                </View>
                <Text style={styles.text}>Direccion: </Text>
                <View style={styles.inputContainer}>
                <TextInput
                  value={this.state.address}
                  onChangeText = {address => this.setState({ address })}
                  style = {styles.input}
                  onFocus = {a => this.setButtonState(true)}
                  onBlur = {a => this.setButtonState(false)}
                  />
                </View>
                <Text style={styles.text}>Celular: </Text>
                <View style={styles.inputContainer}>
                <TextInput
                  value={this.state.phone}
                  onChangeText = {phone => this.setState({ phone })}
                  style = {styles.input}
                  onFocus = {a => this.setButtonState(true)}
                  onBlur = {a => this.setButtonState(false)}
                  />
                </View>
              </View>
              <DividerView />
              <TouchableOpacity onPress={this.goToChangePassword}>
                <Text style={styles.changePassword}>{strings.CHANGE_PASSWORD}</Text>
              </TouchableOpacity>
              <DividerView />
            </ScrollView>
            {this.renderButton()}
          </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  name: {
    fontSize: 20,
    marginTop: 10,
    color: 'black',
    fontWeight: 'bold'
  },
  email: {
    fontSize: 16,
    marginTop: 10,
    color: '#C8C8C8'
  },
  img:{
    height: 130,
    width: 130,
    borderRadius: 65,
    marginTop: 100,
  },
  userInfo:{
    height: 300,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    marginBottom: 15
  },
  dataToEdit:{
    backgroundColor: colors.WHITE,
    paddingTop: 20,
    color: colors.BLACK,
    marginBottom: 20
  },
  text:{
    fontSize: 16,
    color: colors.BLACK,
    paddingLeft: 15,
    marginBottom: 10
  },
  changePassword:{
    fontSize: 16,
    color: colors.BLACK,
    paddingLeft: 15,
    marginBottom: 10,
    fontWeight: 'bold',
    marginTop: 10
  },
  input:{
    width: WIDTH - 55,
    fontSize: 16,
    color: colors.BLACK,
    marginHorizontal: 5,
    height: 30
  },
  inputContainer:{
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: WIDTH - 55,
    marginHorizontal: 15,
    marginBottom: 15,
    height: 30
  },
  btnLogin: {
    width: WIDTH - 80,
    height: 50,
    marginRight:20,
    marginLeft:40,
    marginTop:10,
    marginBottom: 10,
    backgroundColor:'#5BC3BF',
    borderRadius:10,
    justifyContent: 'center'
  },
  saveText:{
    color:'#fff',
    textAlign:'center',
    fontSize: 17,
    fontWeight: 'bold'
  }
});


const mapStateToProps = state => ({
    userDetails: state.user.userDetails,
    userToken: state.auth.token
});

const mapDispatchToProps = dispatch => ({
    updateUserDetails: (data) => dispatch(updateUserDetails(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
