import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import MenuBackButton from '../components/MenuBackButton';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

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

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <View style={styles.container}>
      <MenuBackButton
        navigation={this.props.navigation}
        url="ChatList"
      />
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mainView: {
    marginTop: 70,
  }
});
