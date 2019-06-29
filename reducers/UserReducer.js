import {
  FETCH_USER_DETAIL_SUCCESS,
  FETCH_USER_DETAIL_REQUEST,
  FETCH_USER_DETAIL_FAILURE,
  UPDATE_USER_DETAIL_SUCCESS,
  UPDATE_USER_DETAIL_REQUEST,
  UPDATE_USER_DETAIL_FAILURE,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_FAILURE,
} from '../actions/UserActions';

const initialState = {
  userDetails: {},
  loading: false,
  error: null,
};


export default function userDetailsReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_USER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_USER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        userDetails: action.payload.userDetails
      };

    case FETCH_USER_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        userDetails: {}
      };

      case UPDATE_USER_DETAIL_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };

      case UPDATE_USER_DETAIL_SUCCESS:
        return {
          ...state,
          loading: false,
          userDetails: action.payload.userDetails
        };

      case UPDATE_USER_DETAIL_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          userDetails: {}
        };

        case RESET_PASSWORD_REQUEST:
          return {
            ...state,
            loading: true,
            error: null
          };

        case RESET_PASSWORD_SUCCESS:
          return {
            ...state,
            loading: false
          };

        case RESET_PASSWORD_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload.error
          };

          case CHANGE_PASSWORD_REQUEST:
            return {
              ...state,
              loading: true,
              error: null
            };

          case CHANGE_PASSWORD_SUCCESS:
            return {
              ...state,
              loading: false
            };

          case CHANGE_PASSWORD_FAILURE:
            return {
              ...state,
              loading: false,
              error: action.payload.error
            };

    default:
      return state;
  }
}
