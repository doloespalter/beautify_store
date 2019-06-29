import React from 'react';
import { StyleSheet, View} from 'react-native';
import colors from "../constants/Colors";


export default class DividerView extends React.Component {

  render() {
    return (
        <View style={styles.divider} />
    );
  }
}


const styles = StyleSheet.create({
  divider: {
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 15
  }
});
