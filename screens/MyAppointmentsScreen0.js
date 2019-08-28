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
import { Ionicons } from '@expo/vector-icons';
import EventCalendar from 'react-native-events-calendar'
import moment from 'moment'
import CalendarStrip from 'react-native-calendar-strip';


const HEIGHT = Dimensions.get('window').height


class MyAppointmentsScreen extends React.Component {

  componentDidMount(){
    this.updateData();

  }

  updateData = () => {
    const { fetchMyAppointments , token, storeId } = this.props;
    const date =  moment().format('YYYY-MM-DD');
    fetchMyAppointments(storeId, date, token);
  }

  onCancelAppointment = (appointmentId) => {
    const {token, cancelAppointment} = this.props;

    cancelAppointment(appointmentId, token).then((response) => {
       Alert.alert(response);
    })
  }

  eventTapped = (data) => {
    console.log(data);
  };

  dateChanged= () => {
    console.log("date change");
  };

  onDateSelected = (value) => {
    var formattedDate = value.format("YYYY-MM-DD");
    const { fetchMyAppointments , token, storeId } = this.props;
    fetchMyAppointments(storeId, formattedDate, token);
  }

  render() {

      const { myAppointments, navigation, loading } = this.props;

      const formattedArray = [];
      if(myAppointments && myAppointments.length){
      myAppointments.map(item => {
        var app = {}
        app.start = moment(item.timeStart).format('YYYY-MM-DD HH:mm:ss')
        app.end = moment(item.timeEnd).format('YYYY-MM-DD HH:mm:ss')
        app.title = item.client.name
        app.summary = item.service.name
        formattedArray.push(app)
      });
    }
    console.log(formattedArray);


    let {width} = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={() => this.updateData()} />
        <MenuButton navigation={navigation}/>
        <View style={styles.topContainer}>
        { loading ?
         <LoadingIndicator /> :
        (
          <View style={styles.agenda}>
          <EventCalendar
            eventTapped={this.eventTapped.bind(this)}
            events={formattedArray}
            width={width}
            initDate={moment()}
            start={'10'}
            end={20}
            dateChanged={()=> console.log("date changed")}
            headerStyle={{height:0, backgroundColor: 'red'}}
          />
          </View>
          )
        }
          <View style={styles.dateRectangle}>
            <CalendarStrip
              style={{height:100, paddingTop: 20}}
              calendarAnimation={{type: 'sequence', duration: 30}}
              daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, backgroundHighlightColor: 'red'}}
              onDateSelected={(date) => this.onDateSelected(date)}
              startingDate={moment().add(1,'day')}
            />
          </View>
        </View>
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
    marginTop: 70,
    height: HEIGHT - 80
  },
  agenda:{
    flex: 1,
    marginTop: 50,
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
      marginTop: 130
    },
  dateRectangle:{
    position: 'absolute',
    top: 0, flex: 1,
    alignSelf: 'stretch',
    right: 0,
    left: 0,
    height: 100,
    backgroundColor: '#F2F2F4',
    zIndex: 200
  },
});



const mapStateToProps = state => ({
    myAppointments: state.appointment.myAppointments,
    token: state.auth.token,
    loading: state.appointment.loading,
    storeId: state.auth.storeId

});


const mapDispatchToProps = dispatch => ({
    fetchMyAppointments: (storeId, date, token) => dispatch(fetchMyAppointments(storeId, date, token)),
    cancelAppointment:(idStore, token) => dispatch(cancelAppointment(idStore,date, token))
});



export default connect(mapStateToProps, mapDispatchToProps)(MyAppointmentsScreen);
