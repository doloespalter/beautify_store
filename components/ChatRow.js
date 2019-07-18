import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import placeholder from "../assets/images/image-placeholder.png";
import place from "../assets/images/placeholder.png";
import StarRating from './StarRating';
import AppUrls from '../config/AppUrls';
import clientlogo from "../assets/images/clientlogo.png";

type Props = {
  name : string,
  date: string
};

class ChatRow extends React.Component {

  render(){
    let name = this.props.name;
    let date = this.props.date;
    return(
        <View style={styles.container}>
              <Text style={styles.name}>
                  {name}
              </Text>
              <Text style={styles.date}>
                  {date}
              </Text>
          </View>
    );
  }
}



const styles = StyleSheet.create({
    container: {
       flex: 1,
       flexDirection: 'column',
       padding: 10,
       marginLeft:16,
       marginRight:16,
       marginBottom: 8,
       borderBottomColor: '#cdcdcd',
       borderBottomWidth: 1,
    },
    name: {
        fontSize: 16,
        color: 'black',
    },
    date: {
        fontSize: 16,
        color: 'black',
    }
});

export default ChatRow;
