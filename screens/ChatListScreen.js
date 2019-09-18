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
import { fetchAllChats } from '../actions/ChatActions';
import { connect } from 'react-redux';
import LoadingIndicator from '../components/LoadingIndicator';
import { NavigationEvents } from 'react-navigation';
import socketIO from 'socket.io-client';



class ChatScreen extends React.Component {

  state={
    isLoading: false
  }

  componentWillMount() {
    this.setState({isLoading: true});
    const { fetchAllChats, token } = this.props;
    fetchAllChats(token).then(() => this.setState({isLoading: false}));
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

    //socket.on('newMessage', () => {
     // console.log("REFRESH MESSAGES!");
      //this.updateData();
 //   })
  }

  updateData = () => {
    const { fetchAllChats, token } = this.props;
    fetchAllChats(token);
  }

  goToChatScreen = (id) => {
    this.props.navigation.navigate('Chat', {chatterId: id});
  }


  render() {
    const { chats, myId } = this.props;
    const { isLoading } = this.state;
    const filteredChats = chats.filter(c => c.messages.length > 0).sort((a, b) => a.messages[0].createdAt < b.messages[0].createdAt);
    return (
      <View style={styles.container}>
      <NavigationEvents onDidFocus={() => this.updateData()} />
      <MenuButton
        navigation={this.props.navigation}
      />
      <View style={styles.mainView}>
      {
        isLoading ?
          <LoadingIndicator />
        : (
          <View>
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>
                Mensajes
              </Text>
            </View>
            <FlatList
               data={filteredChats}
               keyExtractor={(item, index) => (item.id).toString()}
               renderItem={({ item }) => {
                 const imSender = (myId === item.senderId);
                 const chatterName = imSender ? item.receiver.name : item.sender.name;
                 const chatterId = imSender ? item.receiver.id : item.sender.id;
                 return (
                   <TouchableHighlight onPress={() => this.goToChatScreen(chatterId)}>
                     <ChatRow
                        name={chatterName}
                        date={item.messages[0].createdAt}
                        lastMessage={item.messages[0].text}
                      />
                    </TouchableHighlight>
                 )
               }
              }
            />
          </View>
        )
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
    flex: 1,
    marginTop: 80,
  },
  heading: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 5,
    color: '#131313',
    fontFamily: 'open-sans-bold'
  },
});


const mapStateToProps = state => ({
    chats: state.chat.chats,
    myId: state.chat.myId,
    loading: state.chat.loading,
    token: state.auth.token,
});


const mapDispatchToProps = dispatch => ({
    fetchAllChats: (token) => dispatch(fetchAllChats(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
