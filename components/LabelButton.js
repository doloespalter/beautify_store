import React from "react";
import { TouchableOpacity, StyleSheet,Text} from "react-native";
import PropTypes from 'prop-types';

const LabelButton = ({title, onClick}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onClick}
      underlayColor='#fff'>
      <Text style={styles.text}>	{title} </Text>
    </TouchableOpacity>
  );
};




LabelButton.defaultProps = {
  title: "Click"
}

LabelButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func
}

const styles = StyleSheet.create({
  button:{
     marginRight:30,
     marginLeft:30,
     marginTop:10,
     paddingTop:10,
     paddingBottom:10,
     borderRadius:10,
     borderWidth: 1,
     borderColor: 'black'
   },
   text:{
       color:'black',
       textAlign:'center',
       paddingLeft : 10,
       paddingRight : 10,
      fontSize: 15,
   }
});


export default LabelButton;
