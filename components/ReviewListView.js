import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import colors from '../constants/Colors';
import moment from "moment";

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
    backgroundColor: '#ffffff',
    borderColor: '#707070',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    elevation: 2,
  },
  firstRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  ratingItems: {
    display: 'flex',
    flexDirection: 'row'
  },
  ratContainer:{
    borderRadius: 10,
      padding: 2,
      paddingLeft: 5,
      paddingRight: 5,
      backgroundColor: colors.BEAUTIFY,
      marginRight: 5
  },
  commentRow:{
    marginBottom: 3,
  },
  rat:{
    color: 'white',
  },
  comment:{
    fontSize: 13,
    color: colors.MEDIUMGRAY,
  },
  userName: {
    fontSize: 11,
    color: colors.MEDIUMGRAY,
  },
  date:{
    color: colors.MEDIUMGRAY,
    fontSize: 13,
  },
});


type Props = {
  itemList : array,
};

class ReviewListView extends React.Component {

  render(){
    const {itemList, onClick} = this.props;
    return(
    <View style={styles.container}>
        <FlatList
              data={itemList}
               renderItem={({ item }) =>
                <View style={styles.rowContainer}>
                    <View style={styles.firstRow}>
                      <View style={styles.ratingItems}>
                          <View style={styles.ratContainer}>
                            <Text style={styles.rat}>{(item.rating/2).toFixed(1)}</Text>
                          </View>
                          <StarRating
                            disabled={true}
                            maxStars={5}
                            containerStyle={{width:110}}
                            starSize={20}
                            rating={item.rating/2}
                            halfStarEnabled={false}
                            emptyStarColor={colors.BEAUTIFY}
                            fullStarColor={colors.BEAUTIFY}
                          />
                      </View>
                      <View>
                        <Text style={styles.date}> {moment(item.createdAt).format("YYYY/MM/DD")}</Text>
                      </View>
                    </View>
                    <View style={styles.commentRow}>
                      <Text style={styles.comment}> {item.comment} </Text>
                    </View>
                    <View style={styles.userRow}>
                      <Text style={styles.userName}> {item.client.name} </Text>
                    </View>
                </View>
              }
            />

    </View>
  );
}
}

ReviewListView.propTypes = {
  itemList:PropTypes.object.isRequired
}


export default ReviewListView;
