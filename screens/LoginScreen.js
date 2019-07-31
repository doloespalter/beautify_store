import * as React from "react";
import { Image, KeyboardAvoidingView, StyleSheet, View, Dimensions, TextInput, ImageBackground , TouchableOpacity, Text} from "react-native";
import { createStackNavigator  } from 'react-navigation';
import imageLogo from "../assets/images/logo.png";
import bkg from "../assets/texture-bkg.png";
import strings from "../constants/Strings";
import colors from "../constants/Colors";
import { OK } from "../constants/response_types";
import { Ionicons } from '@expo/vector-icons';
import {Alert} from 'react-native';
import LoadingIndicator from '../components/LoadingIndicator';
import AuthenticationService from '../services/AuthenticationService';

import { connect } from 'react-redux';
import { saveUserToken, login } from '../actions/AuthActions';
import { fetchUserDetails, sendNotificationToken } from '../actions/UserActions';

interface State {
  email: string;
  password: string;
  emailTouched: boolean;
  passwordTouched: boolean;
}

const WIDTH = Dimensions.get('window').width

class LoginScreen extends React.Component{

  passwordInputRef = React.createRef();

   state: State = {
    email: "",
    password: "",
    showPass: true,
    press: false,
    loading: false,
  };

    showPass = () => {
      if(this.state.press == false){
        this.setState({showPass:false, press: true})
      }else{
        this.setState({showPass:true, press: false})
      }
    }

    goToSignUp = () => {
      this.props.navigation.navigate('SignUp');
    }

    forgotPassword = () => {
      this.props.navigation.navigate('ForgotPassword');
    }

    handleLoginPress = () => {
      const { login } = this.props;

      this.setState({ loading: true});
      login(this.state.email, this.state.password).then(() => {
            if(this.props.token !== undefined && this.props.token !== null){
          //    this.props.fetchUserDetails(this.props.token);
              this.props.sendNotificationToken(this.props.token);
              this.setState({ loading: false});
              this.props.navigation.navigate('Home');
            } else {
              this.setState({ loading: false});
              Alert.alert('Email y/o contraseña incorrecto/s');
            }
         })
          .catch(error => {
             console.log(error);
              this.setState({ error })
          });
    };

    render() {
        const {
        email,
        password,
        emailTouched,
        passwordTouched,
        loading
      } = this.state;
      return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <ImageBackground source={bkg} style= {styles.backgroundContainer}>
             {loading ? ( <LoadingIndicator /> ) : (
              <View >
                <View style={styles.logoContainer}>
                    <Image source={imageLogo} style={styles.logo} />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons
                      name = "ios-person"
                      size = {26}
                      color="#FFFFFF"
                      style = {styles.inputIcon}
                    />
                    <TextInput
                      style = {styles.input}
                      placeholder = {strings.EMAIL_PLACEHOLDER}
                      placeholderTextColor = {'#FFFFFF'}
                      onChangeText = {email => this.setState({ email })}
                      value={this.state.email}
                      />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons
                      name = "ios-lock"
                      size = {26}
                      color="#FFFFFF"
                      style = {styles.inputIcon}
                    />
                    <TextInput
                      style = {styles.input}
                      placeholder = {strings.PASSWORD_PLACEHOLDER}
                      secureTextEntry = {this.state.showPass}
                      placeholderTextColor = {'#FFFFFF'}
                      onChangeText = {password => this.setState({ password })}
                      value={this.state.password}
                      />

                      <TouchableOpacity style={styles.btnEye} onPress={this.showPass.bind(this)}>
                        <Ionicons
                          name = {this.state.press == false? "ios-eye" : "ios-eye-off"}
                          size = {22}
                          color="#FFFFFF"
                        />
                      </TouchableOpacity>
                </View>


                <TouchableOpacity style={styles.btnLogin} onPress={this.handleLoginPress}>
                  <Text style={styles.text}>{strings.LOGIN}</Text>
                </TouchableOpacity>
                </View>
              )}
            </ImageBackground>
          </KeyboardAvoidingView>
      );
    }
  }

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height:null,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginTop: 30
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  },
  inputContainer: {
    marginTop: 10,
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: '#FFFFFF',
    marginHorizontal: 25
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37,
    zIndex: 2
  },
  btnEye: {
    position: 'absolute',
    top: 8,
    right: 37,
    zIndex: 2
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#0d98ba',
    justifyContent: 'center',
    marginTop: 20
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center'
  },
  signUpText: {
    color: '#696969',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
    textDecorationLine: 'underline'
  }

});

const mapStateToProps = state => ({
    token: state.auth.token,
});


const mapDispatchToProps = dispatch => ({
    saveUserToken: () => dispatch(saveUserToken()),
    login:(username, password) => dispatch(login(username,password)),
    fetchUserDetails: (userToken) => dispatch(fetchUserDetails(userToken)),
    sendNotificationToken: (userToken) => dispatch(sendNotificationToken(userToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
