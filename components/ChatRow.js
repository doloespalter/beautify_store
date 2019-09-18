import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import placeholder from "../assets/images/image-placeholder.png";
import place from "../assets/images/placeholder.png";
import StarRating from './StarRating';
import AppUrls from '../config/AppUrls';
import colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

type Props = {
  name : string,
  date: string,
  lastMessage: string
};

class ChatRow extends React.Component {

  render(){
    let name = this.props.name;
    let date = this.props.date;
    let lastMessage = this.props.lastMessage;
    return(
        <View style={styles.container}>
          <View>
            <Text style={styles.name}>
                {name}
            </Text>
            <Text style={styles.date}>
                {lastMessage.length < 35
                ? `${lastMessage}`
                : `${lastMessage.substring(0, 32)}...`} - {moment(date).fromNow()}
            </Text>
          </View>
          <View>
            <Ionicons
                name='ios-arrow-forward'
                size={17}
                color={colors.MEDIUMGRAY}
                style={{...styles.arrow, marginTop:10}}
                />
          </View>
        </View>
    );
  }
}



const styles = StyleSheet.create({
    container: {
       flex: 1,
       flexDirection: 'row',
       padding: 10,
       marginLeft:16,
       marginRight:16,
       marginBottom: 8,
       borderBottomColor: '#cdcdcd',
       borderBottomWidth: 1,
       justifyContent: 'space-between'
    },
    leftContent:{
      flexDirection: 'column',
    },
    name: {
        fontSize: 16,
        color: '#131313',
        fontFamily: 'open-sans-bold'
    },
    date: {
        fontSize: 12,
        color: '#131313',
        fontFamily: 'open-sans'
    }
});

export default ChatRow;
