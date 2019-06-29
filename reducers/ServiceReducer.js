import {
  FETCH_SERVICE_DETAIL_SUCCESS,
  FETCH_SERVICE_DETAIL_REQUEST,
  FETCH_SERVICE_DETAIL_FAILURE
} from '../actions/ServiceActions';

const initialState = {
  service: {},
  employees: [],
  loading: false,
  error: null,
};


export default function serviceDetailsReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_SERVICE_DETAIL_REQUEST:
    return {
      ...state,
      loading: true,
      error: null
    };

    case FETCH_SERVICE_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        service: action.payload.serviceDetails,
        employees: action.payload.serviceDetails.employees
      };

    case FETCH_SERVICE_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        service: {},
        employees: []
      };


    default:
      return state;
  }
}
