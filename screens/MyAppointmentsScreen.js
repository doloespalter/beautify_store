import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar, Image, Text, FlatList} from 'react-native';
import MenuButton from '../components/MenuButton';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import placeholder from "../assets/images/image-placeholder.png";
import StarRating from '../components/StarRating';
import AppointmentRow from '../components/AppointmentRow';
import {Alert} from 'react-native';
import { connect } from 'react-redux';
import { fetchMyAppointments, cancelAppointment } from '../actions/AppointmentActions';
import {NavigationEvents} from 'react-navigation';
import LoadingIndicator from '../components/LoadingIndicator';
import { Ionicons } from '@expo/vector-icons';
import EventCalendar from 'react-native-events-calendar'
import moment from 'moment'
import 'moment/locale/es';
import CalendarStrip from 'react-native-calendar-strip';

const HEIGHT = Dimensions.get('window').height

const locale = {
  name: 'es',
  config: {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Setiembre_Octubre_Noviembre_Diciembre'.split(
      '_'
    ),
    monthsShort: 'Janv_Févr_Mars_Avr_Mai_Juin_Juil_Août_Sept_Oct_Nov_Déc'.split(
      '_'
    ),
    weekdays: 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'),
    weekdaysShort: 'Dom_Lun_Mar_Mie_Jue_Vie_Sab'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY LT',
      LLLL: 'dddd D MMMM YYYY LT'
    },
    calendar: {
      sameDay: "[Aujourd'hui à] LT",
      nextDay: '[Demain à] LT',
      nextWeek: 'dddd [à] LT',
      lastDay: '[Hier à] LT',
      lastWeek: 'dddd [dernier à] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'dentro de %s',
      past: 'Hace %s',
      s: 'segs',
      m: 'min',
      mm: '%d min',
      h: 'una hora',
      hh: '%d horas',
      d: 'un día',
      dd: '%d días',
      M: 'un mes',
      MM: '%d meses',
      y: 'un año',
      yy: '%d años'
    },
    ordinalParse: /\d{1,2}(er|ème)/,
    ordinal: function(number) {
      return number + (number === 1 ? 'er' : 'ème');
    },
    meridiemParse: /PD|MD/,
    isPM: function(input) {
      return input.charAt(0) === 'M';
    },
    // in case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example)
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */
    // },
    meridiem: function(hours, minutes, isLower) {
      return hours < 12 ? 'PD' : 'MD';
    },
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
  }
};


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

  onDateSelected = (value) => {
    var formattedDate = value.format("YYYY-MM-DD");
    const { fetchMyAppointments , token, storeId } = this.props;
    fetchMyAppointments(storeId, formattedDate, token);
  }

  render() {
    const { myAppointments, navigation, loading } = this.props;

    let {width} = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={() => this.updateData()} />
        <MenuButton navigation={navigation}/>
        <View style={styles.topContainer}>
          <View style={styles.dateRectangle}>
            <CalendarStrip
              locale={locale}
              style={{height:100, paddingTop: 20}}
              daySelectionAnimation={{type: 'background',highlightColor:'#d3d3d3', duration: 200, borderWidth: 1, backgroundHighlightColor: 'red'}}
              onDateSelected={(date) => this.onDateSelected(date)}
              startingDate={moment()}
              //calendarHeaderFormat={"ddd, hA"}
            />
          </View>
        </View>

        { loading ?
         <LoadingIndicator /> :
        (
          <View style={styles.agenda}>
            {(myAppointments && myAppointments.length) ? (
                <FlatList
                    data={myAppointments}
                    renderItem={({ item }) =>
                      <AppointmentRow data={item} />
                    }
                    keyExtractor={(item, index) => 'key'+index}
                  />
            ) : (
              <View style={styles.emptyTextContainer}>
                <Text style={styles.emptyText}> No tienes citas para este día </Text>
              </View>
            ) }
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
    backgroundColor: '#f0f0f0'
  },
  topContainer: {
    marginTop: 70,
    backgroundColor: 'white',
    paddingBottom: 10
  },
  agenda:{
    flex: 1,
    marginTop:10
  },
  emptyTextContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 120,
  },
  emptyText:{
    fontFamily: 'open-sans',
    fontSize: 15
  },
  backgroundImage:{
    backgroundColor: '#FFFFB2',
    height: 180,
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
