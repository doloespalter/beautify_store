import ChatService from '../services/ChatService';

export const FETCH_MESSAGES_REQUEST   = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_CHATS_REQUEST   = 'FETCH_CHATS_REQUEST';
export const FETCH_CHATS_SUCCESS = 'FETCH_CHATS_SUCCESS';


export const fetchMessagesRequest = () => ({
  type: FETCH_MESSAGES_REQUEST
});

export const fetchMessagesSuccess = messages => ({
  type: FETCH_MESSAGES_SUCCESS,
  payload: { messages }
});

export const fetchChatsRequest = () => ({
  type: FETCH_CHATS_REQUEST
});

export const fetchChatsSuccess = response => ({
  type: FETCH_CHATS_SUCCESS,
  payload: { response }
});

export const fetchAllChats = (token) => dispatch => {
  dispatch(fetchChatsRequest());
  return ChatService.fetchAllChats(token).then((response) => {
      dispatch(fetchChatsSuccess(response))
      return response;
    }
  )
}

export const fetchMessages = (chatterId, token) => dispatch => {
  dispatch(fetchMessagesRequest());
  return ChatService.fetchMessages(chatterId, token).then((response) => {
      dispatch(fetchMessagesSuccess(response))
      return response;
    }
  )
}

export const sendMessage = (body, token) => dispatch => {
  dispatch(fetchMessagesRequest());
  return ChatService.sendMessage(body, token).then((response) => {
      dispatch(fetchMessagesSuccess(response))
      return response;
    }
  )
}
