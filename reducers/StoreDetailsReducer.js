import {
  FETCH_STORE_DETAIL_SUCCESS,
  FETCH_STORE_DETAIL_REQUEST,
  FETCH_STORE_DETAIL_FAILURE
} from '../actions/StoreDetailsActions';

const initialState = {
  storeDetails: {},
  storeRating: {},
  loading: false,
  error: null,
};


export default function storeDetailsReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_STORE_DETAIL_REQUEST:
    return {
      ...state,
      loading: true,
      error: null
    };

    case FETCH_STORE_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        storeDetails: action.payload.storeDetails.store,
        storeRating: action.payload.storeDetails.rating,
      };

    case FETCH_STORE_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        storeDetails: {}
      };


    default:
      return state;
  }
}
