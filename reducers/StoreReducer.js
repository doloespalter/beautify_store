import {
  FETCH_STORES_REQUEST,
  FETCH_STORES_SUCCESS,
  FETCH_STORES_FAILURE,
} from '../actions/StoresActions';

const initialState = {
  stores: [],
  loading: false,
  error: null
};


export default function storeReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_STORES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_STORES_SUCCESS:
      return {
        ...state,
        loading: false,
        stores: action.payload.stores
      };

    case FETCH_STORES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        stores: []
      };


    default:
      return state;
  }
}
