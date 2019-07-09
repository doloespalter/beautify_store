import AppointmentService from '../services/AppointmentService';

export const FETCH_MY_APPOINTMENTS_REQUEST   = 'FETCH_MY_APPOINTMENTS_REQUEST';
export const FETCH_MY_APPOINTMENTS_SUCCESS = 'FETCH_MY_APPOINTMENTS_SUCCESS';
export const FETCH_MY_APPOINTMENTS_FAILURE = 'FETCH_MY_APPOINTMENTS_FAILURE';
export const CANCEL_APPOINTMENT_REQUEST   = 'CANCEL_APPOINTMENT_REQUEST';
export const CANCEL_APPOINTMENT_SUCCESS = 'CANCEL_APPOINTMENT_SUCCESS';
export const FETCH_PENDING_APPOINTMENTS_SUCCESS = 'FETCH_PENDING_APPOINTMENTS_SUCCESS';


export const fetchMyAppointmentsRequest = () => ({
  type: FETCH_MY_APPOINTMENTS_REQUEST
});

export const fetchMyAppointmentsSuccess = appointments => ({
  type: FETCH_MY_APPOINTMENTS_SUCCESS,
  payload: { appointments }
});

export const fetchPendingAppointmentsSuccess = appointments => ({
  type: FETCH_PENDING_APPOINTMENTS_SUCCESS,
  payload: { appointments }
});

export const fetchMyAppointmentsFailure = error => ({
  type: FETCH_MY_APPOINTMENTS_FAILURE,
  payload: { error }
});

export const cancelAppointmentSuccess = response => ({
  type: CANCEL_APPOINTMENT_SUCCESS,
  payload: {}
});

export const cancelAppointmentRequest = () => ({
  type: CANCEL_APPOINTMENT_REQUEST,
});

export const fetchMyAppointments = (storeId, token) => dispatch => {
  dispatch(fetchMyAppointmentsRequest());
  return AppointmentService.fetchMyAppointments(storeId, token).then((response) =>{
      dispatch(fetchMyAppointmentsSuccess(response))
    }
  )
}

export const fetchPendingAppointments = (storeId, token) => dispatch => {
  dispatch(fetchMyAppointmentsRequest());
  return AppointmentService.fetchPendingAppointments(storeId, token).then((response) =>{
      dispatch(fetchPendingAppointmentsSuccess(response))
    }
  )
}

export const createAppointment = (idStore, body, token) => dispatch => {
  dispatch(createAppointmentRequest());
  return AppointmentService.createAppointment(idStore, body, token).then((response) => {
      dispatch(createAppointmentSuccess(response))
      return response.message;
    }
  )
}

export const cancelAppointment = (idAppointment, token) => dispatch => {
  dispatch(cancelAppointmentRequest());
  return AppointmentService.cancelAppointment(idAppointment, token).then((response) => {
      dispatch(cancelAppointmentSuccess(response))
      return response.message;
    }
  )
}

export const fetchAppointmentDetails = (idAppointment, token) => dispatch => {
  return AppointmentService.fetchAppointmentDetails(idAppointment, token).then((response) =>{
      const appointmentDetails = response.appointment;
      return appointmentDetails;
    }
  )
}
