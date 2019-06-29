import StoreService from '../services/StoreService';

export const FETCH_STORES_REQUEST   = 'FETCH_STORES_REQUEST';
export const FETCH_STORES_SUCCESS = 'FETCH_STORES_SUCCESS';
export const FETCH_STORES_FAILURE = 'FETCH_STORES_FAILURE';


export const fetchStoresRequest = () => ({
  type: FETCH_STORES_REQUEST
});

export const fetchStoresSuccess = stores => ({
  type: FETCH_STORES_SUCCESS,
  payload: { stores }
});

export const fetchStoresFailure = error => ({
  type: FETCH_STORES_FAILURE,
  payload: { error }
});


export const fetchStores = (filters = []) => dispatch => {
  dispatch(fetchStoresRequest());
  return StoreService.fetchStores(filters).then((response) => {
      dispatch(fetchStoresSuccess(response))
    }
  )
}
