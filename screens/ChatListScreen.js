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
    const { loading, chats } = this.props;
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
          <FlatList
             data={chats.map(c => ({ id: c.sender.id, name: c.sender.name, date: c.messages[0].createdAt}))}
             keyExtractor={(item, index) => (item.id).toString()}
             renderItem={({ item }) =>
             <TouchableHighlight onPress={() => this.goToChatScreen(item.id)}>
               <ChatRow
                  name={item.name}
                  date={item.date}
                />
              </TouchableHighlight>
            }
          />
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
    marginTop: 80,
  }
});


const mapStateToProps = state => ({
    chats: state.chat.chats,
    loading: state.chat.loading,
    token: state.auth.token,
});


const mapDispatchToProps = dispatch => ({
    fetchAllChats: (token) => dispatch(fetchAllChats(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
