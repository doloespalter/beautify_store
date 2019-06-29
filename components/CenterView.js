import React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';
import colors from "../constants/Colors";


export default class CenterView extends React.Component {

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={this.props.imageURL}/>
          </View>
          <View style={styles.infoContainer}>
            <Text>{this.props.name}</Text>
            <Text>Rating</Text>
          </View>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: 150,
    width: 150,
    marginLeft: 20,
    borderWidth: 0.5,
    borderColor: '#dddddd'
  },
  imageContainer: {
    flex: 2
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10
  }

});
