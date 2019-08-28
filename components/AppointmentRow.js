import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import placeholder from "../assets/images/image-placeholder.png";
import place from "../assets/images/placeholder.png";
import StarRating from './StarRating';
import AppUrls from '../config/AppUrls';
import moment from 'moment';


class StoreRow extends React.Component {
  render(){
      const { data } = this.props;
      const times = moment(data.timeStart).format("HH:mm") + " - " + moment(data.timeEnd).format("HH:mm");
    return(
        <View style={styles.container}>
            <View style={styles.info}>
              <Text style={styles.hours}>{times}</Text>
              <Text style={styles.client}>{data.client.name}</Text>
              <Text style={styles.service}>{data.service.name}</Text>
              <Text style={styles.employee}>Con {data.employee.name}</Text>
            </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       padding: 12,
       marginLeft:16,
       marginRight:16,
       marginBottom: 8,
       backgroundColor: 'white',
       borderBottomColor: '#cdcdcd',
       borderBottomWidth: 1,
    },
    info:{
      display:'flex',
      flexDirection:'column'
    },
    hours: {
      fontFamily: 'open-sans-bold',
      fontSize: 15
    },
    client:{
      fontFamily: 'open-sans',
      fontSize: 15,
      marginTop: 5
    },
    service:{
      fontFamily: 'open-sans',
      fontSize: 13,
      marginTop: 3
    },
    employee:{
      fontFamily: 'open-sans',
      fontSize: 13
    }
});

export default StoreRow;
