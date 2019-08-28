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



class ChatScreen extends React.Component {

  componentWillMount() {
    this.updateData();
  }

  updateData = () => {
    const { fetchAllChats, token } = this.props;
    fetchAllChats(token);
  }

  goToChatScreen = (id) => {
    this.props.navigation.navigate('Chat', {chatterId: id});
  }


  render() {
    const { loading, chats, myId } = this.props;
    const filteredChats = chats.filter(c => c.messages.length > 0);
    return (
      <View style={styles.container}>
      <NavigationEvents onDidFocus={() => this.updateData()} />
      <MenuButton
        navigation={this.props.navigation}
      />
      <View style={styles.mainView}>
      {
        loading ?
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
    marginBottom: 5
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
