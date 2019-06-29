import { AsyncStorage } from 'react-native';
import AuthenticationService from '../services/AuthenticationService';

export const getToken = (token) => ({
    type: 'GET_TOKEN',
    token,
});

export const saveToken = token => ({
    type: 'SAVE_TOKEN',
    token
});

export const removeToken = () => ({
    type: 'REMOVE_TOKEN',
});

export const getStoreId = (storeId) => ({
    type: 'GET_STORE_ID',
    storeId,
});

export const saveStoreId = storeId => ({
    type: 'SAVE_STORE_ID',
    storeId
});

export const removeStoreId = () => ({
    type: 'REMOVE_STORE_ID',
});


export const loading = bool => ({
    type: 'LOADING',
    isLoading: bool,
});

export const error = error => ({
    type: 'ERROR',
    error,
});

export const loggedIn = (loggedIn) => ({
    type: 'LOGGED_IN',
    loggedIn,
});


export const login = (username, password) => dispatch => {
  return AuthenticationService.login(username, password).then((response) => {
      if(response.hasOwnProperty('token')){
        const token = response.token;
        const storeId = response.user.storeWorkingId+"";
        AsyncStorage.setItem('userToken', token);
        console.log(token);
        AsyncStorage.setItem('storeId', storeId);
        dispatch(saveToken(token));
        dispatch(saveStoreId(storeId));
      }
    }
  )
}

export const getStoreIdAction = () => dispatch =>
 AsyncStorage.getItem('storeId')
        .then((storeId) => {
            dispatch(getStoreId(storeId));
        })
        .catch((err) => {
            dispatch(error(err.message || 'ERROR'));
        })


export const getUserToken = () => dispatch =>
 AsyncStorage.getItem('userToken')
        .then((data) => {
            dispatch(loading(false));
            dispatch(getToken(data));
            if(data !== 'undefined' && data !== null){
              dispatch(loggedIn(true));
            }
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })


export const saveUserToken = (data) => dispatch => {
    AsyncStorage.setItem('userToken', data)
        .then((data) => {
            dispatch(loading(false));
            dispatch(saveToken(data));
            dispatch(loggedIn(true));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })
}



export const removeUserToken = () => dispatch =>
    AsyncStorage.removeItem('userToken')
        .then((data) => {
            dispatch(loading(false));
            dispatch(removeToken(data));
            dispatch(loggedIn(false));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })
