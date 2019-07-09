import {
  FETCH_AVAILABLE_TIMINGS_SUCCESS,
  FETCH_AVAILABLE_TIMINGS_REQUEST,
  FETCH_AVAILABLE_TIMINGS_FAILURE,
  FETCH_MY_APPOINTMENTS_REQUEST,
  FETCH_MY_APPOINTMENTS_SUCCESS,
  FETCH_MY_APPOINTMENTS_FAILURE,
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  FETCH_PENDING_APPOINTMENTS_SUCCESS,
} from '../actions/AppointmentActions';

const initialState = {
  myAppointments: [],
  pendingAppointments: [],
  timings: [],
  loading: false,
  creatingAppointment: false,
  error: null,
};


export default function availableTimingsReducer(state = initialState, action) {
  switch(action.type) {
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
    case FETCH_PENDING_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        pendingAppointments: action.payload.appointments,
      };

    default:
      return state;
  }
}
