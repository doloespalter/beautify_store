import {
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_CHATS_REQUEST,
  FETCH_CHATS_SUCCESS
} from '../actions/ChatActions';


const initialState = {
  messages: [],
  chats: [],
  conversation: {},
  myId: '',
  receiver: {},
  loading: false,
};


export default function availableTimingsReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_MESSAGES_REQUEST:
    return {
      ...state,
      loading: true,
      error: null
    };

    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.payload.messages.messages ? action.payload.messages.messages : [],
        conversation: action.payload.messages.conversation,
        receiver: action.payload.messages.receiver,
      };
      case FETCH_CHATS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

      case FETCH_CHATS_SUCCESS:
        return {
          ...state,
          loading: false,
          chats: action.payload.response.conversations,
          myId: action.payload.response.myId
        };

    default:
      return state;
  }
}
