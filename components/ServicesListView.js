import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, StyleSheet, Text, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    color: '#000000',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderColor: '#707070',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    elevation: 2,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftItems: {
    width: '70%',
    flexDirection: 'column',
    flex: 1,
  },
  rightItems: {
    width: '30%'
  },
  name: {
    fontSize: 15,
    color: "#707070",
    height: 22,
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: "#707070",
    alignSelf: 'flex-end'
  }
});


type Props = {
  itemList : array,
};

class ServiceListview extends React.Component {

  render(){
    const {itemList, onClick} = this.props;
    return(
    <View style={styles.container}>
        <FlatList
              data={itemList}
               renderItem={({ item }) =>
               <TouchableHighlight onPress={() => onClick(item.id)}>
                <View style={styles.rowContainer}>
                    <View style={styles.leftItems}>
                      <Text style={styles.name}>
                          {item.name}
                      </Text>
                      <Text style={styles.name}>
                          Duracion: {item.duration}
                      </Text>
                    </View>
                    <View style={styles.rightItems}>
                      <Text style={styles.price}>
                          ${item.price}
                      </Text>
                    </View>
                </View>
              </TouchableHighlight>
              }
            />

    </View>
  );
}
}

ServiceListview.propTypes = {
  itemList:PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}


export default ServiceListview;
