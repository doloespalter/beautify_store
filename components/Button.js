import React from "react";
import { TouchableOpacity, StyleSheet,Text} from "react-native";
import PropTypes from 'prop-types';

const Button = ({title, onClick}) => {
  return (
    <TouchableOpacity
      style={styles.loginScreenButton}
      onPress={onClick}
      underlayColor='#fff'>
      <Text style={styles.loginText}>	{title} </Text>
    </TouchableOpacity>
  );
};




Button.defaultProps = {
  title: "Click"
}

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func
}

const styles = StyleSheet.create({
  loginScreenButton:{
     marginRight:40,
     marginLeft:40,
     marginTop:10,
     paddingTop:10,
     paddingBottom:10,
     backgroundColor:'#5BC3BF',
     borderRadius:10,
     borderWidth: 1,
     borderColor: '#fff'
   },
   loginText:{
       color:'#fff',
       textAlign:'center',
       paddingLeft : 10,
       paddingRight : 10
   }
});


export default Button;
