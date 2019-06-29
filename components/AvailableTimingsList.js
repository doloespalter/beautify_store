import React, { Component } from 'react';
import { ListView,TouchableHighlight,StyleSheet,Text,View, FlatList } from 'react-native';
import LoadingIndicator from './LoadingIndicator';
import PropTypes from 'prop-types'

 class TimingList extends Component {


   renderRow(item) {
       const {selectedTime, onClick} = this.props;
       return (
         <View style={[styles.cellContainer, (selectedTime == item.timeStart ? styles.activeCell : '' )]} key={item.timeStart} >
            <TouchableHighlight onPress={() => onClick(item.timeStart)} underlayColor='transparent'>
              <Text style={styles.name}>
                {item.timeStart}
              </Text>
            </TouchableHighlight>
          </View>
       )
     }


  render() {
    const {timings, loading, selectedTime} = this.props;
    return (
      <View style={styles.container}>
       {loading ? <LoadingIndicator style={{marginTop:10, height: 100}}/> :
        <FlatList
           data={timings}
           horizontal={true}
           renderItem={({ item }) =>
              this.renderRow(item)
          }
          extraData={this.props.selectedTime}
        />
        }
      </View>
    );
  }
}

TimingList.propTypes = {
  timings:PropTypes.object.isRequired,
  onClick:PropTypes.func.isRequired
};

var styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    height: 60
  },
  cellContainer:{
    flex:1,
    backgroundColor:'#e7e7e7',
    height:50,
    width:50,
    borderRadius:25,
    margin:5,
    marginBottom:0
  },
  activeCell : {
    backgroundColor: '#5BC3BF'
  },
  cellWrapper: {
    flexDirection:'row',
    flex:1,
    justifyContent:'flex-start',
    marginTop:10,
    marginBottom:10,
    alignItems:'center',
    paddingRight:5,
    paddingLeft:5
  },
  titleWrapper: {
    justifyContent:'flex-start',
    flex:2,
  },
  name: {
    color: '#FFFFFD',
    fontSize:14,
    fontWeight:'700',
    textAlign:'center',
    paddingTop:15,
  },
  separator: {
    height:1,
    backgroundColor:'#f0f5f5',
  },
});


export default TimingList;
