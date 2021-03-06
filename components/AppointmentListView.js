import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import StoreRow from './StoreRow';
import moment from "moment";
import { Ionicons } from '@expo/vector-icons';
import calendar from "../assets/images/calendar.png";
import clock from "../assets/images/clock.png";
import placeholder from "../assets/images/placeholder.png";
import garbage from "../assets/images/garbage.png";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    color: '#000000',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderColor: '#707070',
    borderRadius: 8,
    margin: 10,
    elevation: 2,
    justifyContent: 'center',
  },
  mainContainer: {
    padding: 10,
  },
  dateInfo:{
    flex: 1,
    flexDirection: 'row',
    marginTop: 3,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 4,
  },
  textContainer: {
    flexDirection: 'row',
    marginRight: 20
  },
  secondaryText: {
    fontSize: 11,
    color: "#707070",
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 5
  },
  photo: {
      height: 50,
      width: 50,
  },
  leftItems: {
    width: '70%',
    flexDirection: 'column',
    flex: 1,
  },
  storeName: {
    fontSize: 14,
    marginBottom: 3
  },
  rightItems: {
    width: '30%'
  },
  serviceName: {
    fontSize: 15,
    color: '#1f7a77',
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: "#707070",
    alignSelf: 'flex-end'
  },
  buttonContainer:{
    height: 35,
    backgroundColor: '#F5F5F5',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  confirmationRow:{
    flex: 1,
    flexDirection: 'row',
    marginTop: 4,
    borderRadius: 6
  },
  confirmed:{
    color:'green',
  },
  unconfirmed:{
    color:'red',
  },
  buttonText:{
    fontSize: 15,
    color: '#707070',
    lineHeight: 35
  }
});

class AppointmentListview extends React.Component {


  onClickDetails = (idAppointment) => {
    this.props.navigation.navigate('AppointmentDetails', { idAppointment: idAppointment });
  };

  render(){
    const {itemList, onClickCancel} = this.props;
    const now = moment();

    return(
    <View style={styles.container}>
        <FlatList
              data={itemList}
              renderItem={({ item }) =>
                <View style={styles.rowContainer} key={item.id}>
                    <TouchableOpacity
                      onPress={() => this.onClickDetails(item.id)}
                      style={styles.mainContainer}>
                      <Text style={styles.serviceName}>
                        {item.service? item.service.name : "default"}
                      </Text>
                      <View style={styles.dateInfo}>
                        <View style={styles.textContainer}>
                          <Image
                          source = {clock}
                          style = {styles.icon}/>
                          <Text style={styles.secondaryText}>
                            {item.service? item.service.duration : "default"} min
                          </Text>
                        </View>
                        <View style={styles.textContainer}>
                          <Image
                          source = {calendar}
                          style = {styles.icon}/>
                          <Text style={styles.secondaryText}>
                             { moment(item.timeStart).format("YYYY/MM/DD HH:mm") }
                          </Text>
                        </View>
                      </View>
                      <View style={styles.storeName}>
                         <Text>
                           {item.store? item.store.name : "default store"}
                         </Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Image
                        source = {placeholder}
                        style = {styles.icon}/>
                        <Text style={styles.secondaryText}>
                          {item.store? item.store.address : ""}
                        </Text>
                      </View>
                      <View style={styles.confirmationRow}>
                          {moment(item.timeStart) > now && (item.isConfirmed === 1?
                            (<Text style={styles.confirmed}>Cita confirmada</Text>)
                            : (
                            (<Text style={styles.unconfirmed}>Esperando confirmacion</Text>)
                          ))}
                      </View>
                    </TouchableOpacity>
                    { moment(item.timeStart) > now? (
                      <TouchableOpacity
                        onPress={() => onClickCancel(item.id)}
                        style={styles.buttonContainer}>
                        <Image
                        source = {garbage}
                        style = {styles.icon}/>
                        <Text style={styles.buttonText}>
                           Cancelar reserva
                        </Text>
                      </TouchableOpacity>
                    ): (
                      <TouchableOpacity
                        onPress={() => {this.props.navigation.navigate('Review', { appointmentId: item.id });}}
                        style={styles.buttonContainer}>
                        <Image
                        source = {garbage}
                        style = {styles.icon}/>
                        <Text style={styles.buttonText}>
                           Dejar reseña
                        </Text>
                      </TouchableOpacity>
                    ) }

                </View>
              }
              keyExtractor={(item, index) => 'key'+index}
            />

    </View>
  );
}
}

AppointmentListview.propTypes = {
  itemList:PropTypes.array.isRequired,
  onClickCancel: PropTypes.func.isRequired
}


export default AppointmentListview;
