import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar, Image, Text} from 'react-native';
import MenuButton from '../components/MenuButton';
import ImageGallery from '../components/ImageGallery';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import placeholder from "../assets/images/image-placeholder.png";
import clientlogo from "../assets/images/clientlogo.png";
import StarRating from '../components/StarRating';
import AppointmentListView from '../components/AppointmentListView';
import {Alert} from 'react-native';
import { connect } from 'react-redux';
import { fetchMyAppointments, cancelAppointment } from '../actions/AppointmentActions';
import {NavigationEvents} from 'react-navigation';
import LoadingIndicator from '../components/LoadingIndicator';

class MyAppointmentsScreen extends React.Component {

  componentDidMount(){
  //  this.updateData();
    console.log("en comp");
  const { fetchMyAppointments , token, storeId } = this.props;
  fetchMyAppointments(storeId, token);
  }

  updateData = () => {
    //console.log("en metood");
  //  const { fetchMyAppointments , token, storeId } = this.props;
  //  fetchMyAppointments(storeId, token);
  }

  onCancelAppointment = (appointmentId) => {
    const {token, cancelAppointment} = this.props;

    cancelAppointment(appointmentId, token).then((response) => {
       Alert.alert(response);
    })
  }

  render() {
    const { myAppointments, navigation, loading } = this.props;
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={() => this.updateData()} />
        <MenuButton navigation={navigation}/>

        { loading ?
         <LoadingIndicator /> :
        (
          <View style={styles.mainClass}>
            <View style={styles.headingContainer}>
            </View>
            <AppointmentListView
              itemList={myAppointments}
              navigation={navigation}
              onClickCancel={this.onCancelAppointment}
            />
          </View>
        )
       }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8'
  },
  topContainer: {
    marginTop: 80,
  },
  backgroundImage:{
    backgroundColor: '#FFFFB2',
    height: 120,
  },
  heading: {
    color: '#707070',
    fontSize: 14,
    marginLeft: 13,
    marginTop: 10
  },
  infoContainer:{
    flexDirection: 'row',
    height: (Dimensions.get('window').width/6 + 10),
  },
  storeName:{
    marginTop: 5,
  },
  name: {
    fontSize: 20,
    paddingBottom: 5,
    color: '#5BC3BF',
    textAlign: 'left',
    fontSize: 16,
  },
  imgView:{
    width: (Dimensions.get('window').width/3),
    height: (Dimensions.get('window').width/6 + 10),
  },
  storeImage:{
    height: (Dimensions.get('window').width/3 - 20),
    width: (Dimensions.get('window').width/3 - 20),
    borderRadius: (Dimensions.get('window').width/6 - 10),
    marginTop: -(Dimensions.get('window').width/6 - 10),
    marginLeft: 15,
  },
  tabContainer: {
    backgroundColor: "#ffffff"
  },
  scene: {
    flex: 1,
  },
   photo: {
        height: 50,
        width: 50,
    },
    mainClass: {
      flex: 1,
      marginTop: 80
    }
});



const mapStateToProps = state => ({
    myAppointments: state.appointment.myAppointments,
    token: state.auth.token,
    loading: state.appointment.loading,
    storeId: state.auth.storeId

});


const mapDispatchToProps = dispatch => ({
    fetchMyAppointments: (storeId, token) => dispatch(fetchMyAppointments(storeId, token)),
    cancelAppointment:(idStore, token) => dispatch(cancelAppointment(idStore, token))
});



export default connect(mapStateToProps, mapDispatchToProps)(MyAppointmentsScreen);
