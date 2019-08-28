import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import placeholder from "../assets/images/image-placeholder.png";
import place from "../assets/images/placeholder.png";
import StarRating from './StarRating';
import AppUrls from '../config/AppUrls';

type Props = {
  title : string,
  description: string,
  rating: number
};

class StoreRow extends React.Component {

  render(){
    let title = this.props.title;
    let description = this.props.description;
    let rating = this.props.rating;
    let address = this.props.address;
    let imageUrl = AppUrls.api.baseUrl + '/uploads/' + this.props.image;
    return(
        <View style={styles.container}>
          <Image
            defaultSource={placeholder}
            source={{uri: imageUrl}}
            style={styles.photo} />
          <View style={styles.container_text}>
              <Text style={styles.title}>
                  {title}
              </Text>
              <Text style={styles.description}>
                  {description}
              </Text>
              <View style={styles.textContainer}>
                <Image
                source = {place}
                style = {styles.icon}/>
                <Text style={styles.address}>
                  {address}
                </Text>
              </View>
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
    },
    title: {
        fontSize: 16,
        color: '#000',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 18,
        justifyContent: 'center',
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
        color: "#000000",
        marginBottom: 5
    },
    photo: {
        height: 70,
        width: 70,
    },
    textContainer: {
      flexDirection: 'row',
      marginRight: 20
    },
    address: {
      fontSize: 11,
      color: "#707070",
    },
    icon: {
      width: 15,
      height: 15,
      marginRight: 5
    },
});

export default StoreRow;
