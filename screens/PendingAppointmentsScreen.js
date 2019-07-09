import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar, Image, Text} from 'react-native';
import MenuButton from '../components/MenuButton';
import ImageGallery from '../components/ImageGallery';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import placeholder from "../assets/images/image-placeholder.png";
import clientlogo from "../assets/images/clientlogo.png";
import StarRating from '../components/StarRating';
import AppointmentListView from '../components/PendingAppointmentsListView';
import {Alert} from 'react-native';
import { connect } from 'react-redux';
import { fetchPendingAppointments } from '../actions/AppointmentActions';
import {NavigationEvents} from 'react-navigation';
import LoadingIndicator from '../components/LoadingIndicator';
import { Ionicons } from '@expo/vector-icons';

class PendingAppointmentsScreen extends React.Component {

  componentDidMount(){
    this.updateData();
  }

  updateData = () => {
     const { fetchPendingAppointments , token, storeId } = this.props;
    fetchPendingAppointments(storeId, token);
  }

  render() {
    const { pendingAppointments, navigation, loading } = this.props;
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={() => this.updateData()} />
        <MenuButton navigation={navigation}/>

        { loading ?
         <LoadingIndicator /> :
        (
          <View style={styles.mainClass}>
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>
                Citas pendientes
              </Text>
            </View>
            <AppointmentListView
              itemList={pendingAppointments}
              navigation={navigation}
              updateData={this.updateData}
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
    pendingAppointments: state.appointment.pendingAppointments,
    token: state.auth.token,
    loading: state.appointment.loading,
    storeId: state.auth.storeId
});


const mapDispatchToProps = dispatch => ({
    fetchPendingAppointments: (storeId, token) => dispatch(fetchPendingAppointments(storeId, token)),
    cancelAppointment:(idStore, token) => dispatch(cancelAppointment(idStore, token))
});



export default connect(mapStateToProps, mapDispatchToProps)(PendingAppointmentsScreen);
