import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableHighlight } from 'react-native';
import StoreRow from './StoreRow';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
      color: '#000000',
    },
});

type Props = {
  itemList : array,
};

class StoreListview extends React.Component {

  goToNextScreen = (storeId) => {
    this.props.navigation.navigate('StoreDetail', { storeId: storeId });
   }

  render(){
    let itemList = this.props.itemList;
    var hasStores = itemList.length > 0;
    return(
      <View style={styles.container}>
      {
        hasStores ?
        <FlatList
               data={itemList}
               keyExtractor={(item, index) => (item.id).toString()}
               renderItem={({ item }) =>
               <TouchableHighlight onPress={() => this.goToNextScreen(item.id)}>
                 <StoreRow
                      title={item.name}
                      description={item.description}
                      image={item.image}
                      address={item.address}
                      rating = "5"
                  />
                </TouchableHighlight>
              }
            />
        :
        <Text>No hay centros.</Text>
      }
      </View>
    );
  }
}


export default StoreListview;
