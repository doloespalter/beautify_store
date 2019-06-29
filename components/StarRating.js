import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
  Image
} from 'react-native';

import starfilled from "../assets/images/star-filled2.png";
import starunfilled from "../assets/images/star-unfilled2.png";

type Props = {
  rating : number;
};

export default class StarRating extends Component<Props> {
	render() {
    let rating = this.props.rating;
		let stars = [];
		for (var i = 1; i <= 5; i++) {
			let path = starfilled;
			if (i > rating) {
				path = starunfilled;
			}
			stars.push({path});
		}

		return (
			<View style={ styles.container }>
				{ stars.map((item, key)=>(
				 <Image key={key} style={styles.image} source={item.path} />)
				 )}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
    flexDirection: 'row'
	},
  image: {
   width: 20,
   height: 20
  }
});
