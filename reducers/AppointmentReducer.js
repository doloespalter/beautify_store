import {
  FETCH_AVAILABLE_TIMINGS_SUCCESS,
  FETCH_AVAILABLE_TIMINGS_REQUEST,
  FETCH_AVAILABLE_TIMINGS_FAILURE,
  FETCH_MY_APPOINTMENTS_REQUEST,
  FETCH_MY_APPOINTMENTS_SUCCESS,
  FETCH_MY_APPOINTMENTS_FAILURE,
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS
} from '../actions/AppointmentActions';

const initialState = {
  myAppointments: [],
  timings: [],
  loading: false,
  creatingAppointment: false,
  error: null,
};


export default function availableTimingsReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_AVAILABLE_TIMINGS_REQUEST:
    return {
      ...state,
      loading: true,
      error: null
    };

    case FETCH_AVAILABLE_TIMINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        timings: action.payload.availableTimings,
      };

    case FETCH_AVAILABLE_TIMINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        timings: [],
      };
    case FETCH_MY_APPOINTMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_MY_APPOINTMENTS_SUCCESS:
        return {
          ...state,
          loading: false,
          myAppointments: action.payload.appointments,
        };

    case FETCH_MY_APPOINTMENTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          myAppointments: [],
        };
    case CREATE_APPOINTMENT_REQUEST:
        return {
          ...state,
          creatingAppointment: true,
        };
    case CREATE_APPOINTMENT_SUCCESS:
        return {
          ...state,
          creatingAppointment: false,
        };

    default:
      return state;
  }
}
