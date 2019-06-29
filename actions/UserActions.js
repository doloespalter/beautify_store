import UserService from '../services/UserService';
import { AsyncStorage } from 'react-native';

export const FETCH_USER_DETAIL_REQUEST   = 'FETCH_USER_DETAIL_REQUEST';
export const FETCH_USER_DETAIL_SUCCESS = 'FETCH_USER_DETAIL_SUCCESS';
export const FETCH_USER_DETAIL_FAILURE = 'FETCH_USER_DETAIL_FAILURE';
export const UPDATE_USER_DETAIL_REQUEST = 'UPDATE_USER_DETAIL_REQUEST';
export const UPDATE_USER_DETAIL_SUCCESS = 'UPDATE_USER_DETAIL_SUCCESS';
export const UPDATE_USER_DETAIL_FAILURE = 'UPDATE_USER_DETAIL_FAILURE';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';
export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';



export const fetchUserDetailsRequest = () => ({
  type: FETCH_USER_DETAIL_REQUEST
});

export const fetchUserDetailsSuccess = userDetails => ({
  type: FETCH_USER_DETAIL_SUCCESS,
  payload: { userDetails }
});

export const fetchUserDetailsFailure = error => ({
  type: FETCH_USER_DETAIL_FAILURE,
  payload: { error }
});

export const updateUserDetailsRequest = () => ({
  type: UPDATE_USER_DETAIL_REQUEST
});

export const updateUserDetailsSuccess = userDetails => ({
  type: UPDATE_USER_DETAIL_SUCCESS,
  payload: { userDetails }
});

export const updateUserDetailsFailure = error => ({
  type: UPDATE_USER_DETAIL_FAILURE,
  payload: { error }
});

export const resetPasswordRequest = () => ({
  type: RESET_PASSWORD_REQUEST
});

export const resetPasswordSuccess = userDetails => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: { userDetails }
});

export const resetPasswordFailure = error => ({
  type: RESET_PASSWORD_FAILURE,
  payload: { error }
});

export const changePasswordRequest = () => ({
  type: CHANGE_PASSWORD_REQUEST
});

export const changePasswordSuccess = userDetails => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: { userDetails }
});

export const changePasswordFailure = error => ({
  type: CHANGE_PASSWORD_FAILURE,
  payload: { error }
});

export const fetchUserDetails = (userToken) => dispatch => {
  dispatch(fetchUserDetailsRequest());
  return UserService.getUserDetails(userToken).then((response) =>{
      dispatch(fetchUserDetailsSuccess(response));
    }
  )
}

export const updateUserDetails = (info) => dispatch => {
  dispatch(updateUserDetailsRequest());
  return UserService.editUserProfile(info.userInfo, info.userToken).then((response) =>{
      dispatch(updateUserDetailsSuccess(response));
    }
  )
}

export const resetPassword = (email) => dispatch => {
  dispatch(resetPasswordRequest());
  return UserService.resetPassword(email).then((response) =>{
      dispatch(resetPasswordSuccess(response));
    }
  )
}

export const changePassword = (info) => dispatch => {
  dispatch(changePasswordRequest());
  return UserService.changePassword(info.passwords, info.userToken).then((response) =>{
      dispatch(changePasswordSuccess(response));
    }
  )
}



export const sendNotificationToken = (userToken) => dispatch => {
 AsyncStorage.getItem('notificationToken')
        .then((data) => {
          UserService.sendNotificationToken(data, userToken);
        })
        .catch((err) => {
          console.log(err);
        })
      }
