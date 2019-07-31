import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import MenuBackButton from '../components/MenuBackButton';
import { fetchMessages, sendMessage } from '../actions/ChatActions';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

class ChatScreen extends React.Component {
  state = {
    messages: [],
    chatterId: 0
  }

  componentWillMount() {
    this.updateData();
  }

  updateData = () => {
    const chatterId  = this.props.navigation.state.params.chatterId;
    const { token, fetchMessages } = this.props;

    this.setState({
      chatterId : chatterId
    });

    fetchMessages(chatterId, token);
  }

  onSend(messages = []) {
    const { chatterId } = this.state;
    const { token, sendMessage, fetchMessages } = this.props;

    const body = {
      text: messages[0].text,
      receiverId: chatterId
    }

    sendMessage( body, token).then((response) => {
       fetchMessages(chatterId, token);
    })
  }

  render() {
    const { messages, conversation }  = this.props;
    return (
      <View style={styles.container}>
      <NavigationEvents onDidFocus={() => this.updateData()} />
      <MenuBackButton
        navigation={this.props.navigation}
        url="Home"
      />
      <GiftedChat
        messages={messages.reverse().map(m => ({ _id: m.id, text: m.text, createdAt: m.createdAt, user: { _id: m.userId} }))}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: conversation.receiverId,
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



const mapStateToProps = state => ({
    messages: state.chat.messages,
    conversation: state.chat.conversation,
    loading: state.chat.loading,
    token: state.auth.token
});


const mapDispatchToProps = dispatch => ({
    fetchMessages: (chatterId, token) => dispatch(fetchMessages(chatterId, token)),
    sendMessage: (body, token) => dispatch(sendMessage(body, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
