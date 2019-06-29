import React from 'react';
import { StyleSheet,Text,View, TouchableWithoutFeedback, Dimensions, Modal, ScrollView} from 'react-native';
import MenuButton from '../components/MenuButton';
import ImageElement from '../components/ImageElement';

export default class ImageGallery extends React.Component {


  state = {
    modalVisible: false,
    modalImage: require('../assets/images/photo1.jpg'),
    images: [
      require('../assets/images/photo1.jpg'),
      require('../assets/images/photo2.jpg'),
      require('../assets/images/photo3.jpeg'),
      require('../assets/images/photo4.jpeg'),
      require('../assets/images/photo5.jpeg'),
      require('../assets/images/photo6.jpg'),
      require('../assets/images/photo7.jpg'),
      require('../assets/images/photo8.jpeg'),
      require('../assets/images/photo9.jpg'),
      require('../assets/images/photo10.jpg'),
      require('../assets/images/photo11.jpg'),

    ]
  }

  setModalVisible(visible, imageKey){
      this.setState({ modalImage: this.state.images[imageKey] });
      this.setState({ modalVisible: visible });
  }

  getImage() {
      return this.state.modalImage;
  }

  render() {

    let images = this.state.images.map((val, key) => {
        return <TouchableWithoutFeedback key={key}
                    onPress={() => {this.setModalVisible(true, key)}}>
                    <View style={styles.imagewrap}>
                      <ImageElement imgsource={val}></ImageElement>
                    </View>
            </TouchableWithoutFeedback>
    });
    return (
      <ScrollView>
      <View style={styles.container}>
          <View style={styles.secondcontainer}>
            <Modal style={styles.modal} animationType={'fade'}
                transparent={true} visible={this.state.modalVisible}
                onRequestClose={() => {}}>
                  <View style={styles.modal}>
                    <Text style={styles.text}
                      onPress={() => {this.setModalVisible(false)}}>Close</Text>
                      <ImageElement imgsource={this.state.modalImage}></ImageElement>
                  </View>
            </Modal>
              {images}
          </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },secondcontainer: {
    flex: 1,
    marginTop: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: "#fff",
  },
  imagewrap: {
    margin: 2,
    padding: 2,
    height: (Dimensions.get('window').width/3) - 6,
    width: (Dimensions.get('window').width/3) - 6,
    backgroundColor: "#fff"
  },
  modal:{
    flex: 1,
    padding: 39,
    backgroundColor: 'rgba(0,0,0, 0.89)'
  },
  text:{
    color: '#fff'
  }
});
