import API from './index';
import AppUrls from '../config/AppUrls';
import axios from 'axios';
import { buildPathWithParams } from '../utils/Paths';
class ChatService {

  static sendMessage(body, token) {
    return API.postWithToken(AppUrls.api.messages, body, token).then((response) => {
       return response.data;
    })
  }

  static fetchMessages(chatterId, token) {
    let url = buildPathWithParams(AppUrls.api.getMessages, { chatterId });
    return API.getWithToken(url, token).then((response) => {
       return response.data;
    })
  }

  static fetchAllChats(token) {
    return API.getWithToken(AppUrls.api.messages, token).then((response) => {
       return response.data;
    })
  }

}

export default ChatService;
