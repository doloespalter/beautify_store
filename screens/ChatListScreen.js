import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import MenuButton from '../components/MenuButton';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight
} from 'react-native';
import ChatRow from '../components/ChatRow';

export default class ChatScreen extends React.Component {
  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  goToNextScreen = () => {
    this.props.navigation.navigate('Chat');
  }

  render() {
    hasChats = true;
    itemList= [{id:'44', name: 'Dolores', date: '17/07/2019'},{id:'45', name: 'Maria', date: '15/07/2019'}];
    return (
      <View style={styles.container}>
      <MenuButton
        navigation={this.props.navigation}
      />
      <View style={styles.mainView}>
      {
        hasChats ?
        <FlatList
               data={itemList}
               keyExtractor={(item, index) => (item.id).toString()}
               renderItem={({ item }) =>
               <TouchableHighlight onPress={() => this.goToNextScreen(item.id)}>
                 <ChatRow
                    name={item.name}
                    date={item.date}
                  />
                </TouchableHighlight>
              }
            />
        :
        <Text>No tienes mensajes.</Text>
      }
      </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mainView: {
    marginTop: 80,
  }
});
