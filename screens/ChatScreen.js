import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import MenuBackButton from '../components/MenuBackButton';
import { fetchMessages, sendMessage } from '../actions/ChatActions';
import { NavigationEvents } from 'react-navigation';
import LoadingIndicator from '../components/LoadingIndicator';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import socketIO from 'socket.io-client';

class ChatScreen extends React.Component {
  state = {
    messages: [],
    chatterId: 0,
    loading: false
  }

  componentWillMount() {
    this.updateData();
  }

  componentDidMount() { 
    const socket = socketIO('http://afternoon-beyond-65086.herokuapp.com', {      
    transports: ['websocket'], jsonp: false });   
    socket.connect(); 
    socket.on('connect', () => { 
      console.log('connected to socket server'); 
    }); 

    socket.on('refresh', () => { 
      console.log('connected to socket server'); 
    }); 

    socket.on('newMessage', () => {
      console.log("REFRESH MESSAGES!");
      this.updateDataReceived();
    })
  }

  updateData = () => {
    this.setState({
      loading : true
    });
    const chatterId  = this.props.navigation.state.params.chatterId;
    const { token, fetchMessages } = this.props;

    this.setState({
      chatterId : chatterId
    });
    fetchMessages(chatterId, token).then(e => this.setState({ loading : false}));
  }

  updateDataReceived = () => {
    const chatterId  = this.props.navigation.state.params.chatterId;
    const { token, fetchMessages } = this.props;

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
       //fetchMessages(chatterId, token);
    })
  }

  render() {
    const { messages, myId }  = this.props;
    const { loading } = this.state;
    const msg = [...messages];
    console.log("re render");
    console.log(msg);
    return (
      <View style={styles.container}>
      <NavigationEvents onDidFocus={() => this.updateData()} />
      <MenuBackButton
        navigation={this.props.navigation}
        url="ChatList"
      />
      { loading ? (
        <LoadingIndicator/>
      ) : (
        <GiftedChat
          messages={msg.reverse().map(m => ({ _id: m.id, text: m.text, createdAt: m.createdAt, user: { _id: m.userId} }))}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: myId
          }}
        />
      )}
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
    token: state.auth.token,
    myId: state.chat.myId
});


const mapDispatchToProps = dispatch => ({
    fetchMessages: (chatterId, token) => dispatch(fetchMessages(chatterId, token)),
    sendMessage: (body, token) => dispatch(sendMessage(body, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
