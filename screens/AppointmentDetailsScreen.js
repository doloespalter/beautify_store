import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar, Image, Text, TouchableOpacity} from 'react-native';
import MenuButton from '../components/MenuButton';
import ImageGallery from '../components/ImageGallery';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import placeholder from "../assets/images/image-placeholder.png";
import comment from "../assets/images/comment.png";
import calendar from "../assets/images/calendar.png";
import avatar from "../assets/images/avatar.png";
import duration from "../assets/images/duration.png";
import clock from "../assets/images/clock.png";
import rightArrow from "../assets/images/right-arrow.png";
import place from "../assets/images/placeholder.png";
import StarRating from '../components/StarRating';
import Button from '../components/Button';
import colors from '../constants/Colors';
import { connect } from 'react-redux';
import { fetchAppointmentDetails } from '../actions/AppointmentActions';
import { NavigationEvents } from 'react-navigation';
import LoadingIndicator from '../components/LoadingIndicator';
import AppUrls from '../config/AppUrls';
import moment from "moment";


const WIDTH = Dimensions.get('window').width
const PADDING = 15

class AppointmentDetailScreen extends React.Component {

  state={
    loading: true,
    appointmentDetails: {}
  }

  async componentDidMount(){
    this.updateData();
  }

  updateData = async () => {
    const token = this.props.token;
    this.setState({  loading: true  });
    const idAppointment  = this.props.navigation.state.params.idAppointment;
    const appointmentDetails = await this.props.fetchAppointmentDetails(idAppointment, token);

    if(appointmentDetails){
      this.setState({  appointmentDetails: appointmentDetails, loading: false  });
    }
  };

  onCancelAppointment = (appointmentId) => {
    const {token, cancelAppointment} = this.props;

    cancelAppointment(appointmentId, token).then((response) => {
       Alert.alert(response);
    })
  }


  render() {
    const { appointmentDetails, loading } = this.state;
    const now = moment();
  //  const imageUrl = AppUrls.api.baseUrl + "/uploads/" + storeDetails.image;
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={() => this.updateData()} />
        <MenuButton navigation={this.props.navigation}/>
        { loading ?
         <LoadingIndicator /> :
        (
          <View style={styles.mainContainer}>
            <View style={styles.appointmentNameRow}>
             <Text style={styles.appointmentName}>
              {appointmentDetails.service.name}
             </Text>
            </View>
            <View style={styles.storeDetails}>
             <Text style={styles.storeName}>
              {appointmentDetails.store.name}
             </Text>
             <View style={styles.titleWithIcon}>
               <Image
               source = {place}
               style = {styles.icon}/>
              <Text style={styles.secondaryText}>
                {appointmentDetails.store.address}
               </Text>
             </View>
             </View>
             <View style={styles.row}>
              <View style={styles.halfRow}>
                <View style={styles.titleWithIcon}>
                   <Image
                   source = {clock}
                   style = {styles.icon}/>
                  <Text style={styles.secondaryText}>
                    Hora de inicio
                   </Text>
                 </View>
                 <Text style={styles.importantText}>
                    {moment(appointmentDetails.timeStart).format("HH:MM")}
                 </Text>
               </View>
               <View style={styles.halfRow}>
               <View style={styles.titleWithIcon}>
                  <Image
                  source = {calendar}
                  style = {styles.icon}/>
                 <Text style={styles.secondaryText}>
                   Fecha
                  </Text>
                </View>
                <Text style={styles.importantText}>
                   {moment(appointmentDetails.timeStart).format("YYYY/MM/DD")}
                </Text>
                </View>
            </View>
            <View style={styles.row}>
             <View style={styles.halfRow}>
               <View style={styles.titleWithIcon}>
                  <Image
                  source = {duration}
                  style = {styles.icon}/>
                 <Text style={styles.secondaryText}>
                   Duracion
                  </Text>
                </View>
                <Text style={styles.importantText}>
                   {appointmentDetails.service.duration} min
                </Text>
              </View>
              <View style={styles.halfRow}>
              <View style={styles.titleWithIcon}>
                 <Image
                 source = {avatar}
                 style = {styles.icon}/>
                <Text style={styles.secondaryText}>
                  Empleado
                 </Text>
               </View>
               <Text style={styles.importantText}>
                  {appointmentDetails.employee? appointmentDetails.employee.name : "Sin seleccionar"}
               </Text>
               </View>
           </View>
           <View style={styles.row}>
            <Text style={styles.label}>Precio</Text>
            <Text style={styles.importantText}>
               $ {appointmentDetails.service.price}
            </Text>
           </View>
           {moment(appointmentDetails.timeStart) > now && (
             <View style={styles.row}>
              <Text style={styles.label}>Estado</Text>
              {appointmentDetails.isConfirmed === 1? (
                <Text style={styles.confirmed}>Cita confirmada</Text>
              ) : (
                <Text style={styles.unconfirmed}>Esperando confirmacion</Text>
              )}
             </View>
         )}
           { moment(appointmentDetails.timeStart) > now? (
             <Button
              title="Cancelar cita"
              onClick={this.onCancelAppointment}
             />
           ) : (
               <Button
                  title="Dejar reseña"
                  onClick={() => {this.props.navigation.navigate('Review', { appointmentId: appointmentDetails.id })}}
                  />
           )}

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
  },
  mainContainer: {
    flex: 1,
    marginTop: 80,
    padding: PADDING
  },
  appointmentNameRow:{
    paddingBottom: 8,
  },
  appointmentName:{
    fontSize: 18,
    paddingLeft: 8,
    color: colors.BEAUTIFY,
    fontWeight: 'bold'
  },
  storeDetails:{
    padding: 8,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: colors.LIGHTERGRAY
  },
  titleWithIcon: {
    flexDirection: 'row',
    marginRight: 20
  },
  storeName:{
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.LIGHTGRAY,
    marginBottom: 3,
  },
  importantText:{
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.LIGHTGRAY,
    marginBottom: 3,
  },
  secondaryText: {
    fontSize: 13,
    marginBottom: 3,
    color: colors.LIGHTGRAY,
  },
  label:{
      fontSize: 14,
      color: colors.LIGHTGRAY,
  },
  icon: {
    width: 13,
    height: 13,
    marginRight: 5
  },
  row:{
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopColor: colors.LIGHTERGRAY,
    borderTopWidth: 1,
    justifyContent: 'space-between',
  },
  halfRow:{
    width: WIDTH/2 - PADDING,
    flexDirection: 'column'
  },
  confirmed:{
    color:'green',
  },
  unconfirmed:{
    color:'red',
  },

});



const mapStateToProps = state => ({
  token: state.auth.token,
});


const mapDispatchToProps = dispatch => ({
    fetchAppointmentDetails: (idAppointment, token) => dispatch(fetchAppointmentDetails(idAppointment, token)),
});



export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetailScreen);
