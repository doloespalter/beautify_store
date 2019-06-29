import { combineReducers } from 'redux';

const authReducer = (state = {
    token: {},
    storeId: 0,
    loggedIn: false,
    loading: true,
    error: null,
}, action) => {
    switch (action.type) {
        case 'GET_TOKEN':
            return { ...state, token: action.token };
        case 'SAVE_TOKEN':
            return { ...state, token: action.token, loggedIn: true};
        case 'REMOVE_TOKEN':
            return { ...state, token: action.token, loggedIn: false };
        case 'GET_STORE_ID':
            return { ...state, storeId: action.storeId };
        case 'SAVE_STORE_ID':
            return { ...state, storeId: action.storeId};
        case 'REMOVE_STORE_ID':
            return { ...state, storeId: ''};
        case 'LOADING':
            return { ...state, loading: action.isLoading };
        case 'ERROR':
            return { ...state, error: action.error };
        case 'LOGGED_IN':
                return { ...state, loggedIn: action.loggedIn };
        default:
            return state;
    }
};


export default authReducer;
