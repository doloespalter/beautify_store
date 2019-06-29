import StoreService from '../services/StoreService';

export const FETCH_STORE_DETAIL_REQUEST   = 'FETCH_STORE_DETAIL_REQUEST';
export const FETCH_STORE_DETAIL_SUCCESS = 'FETCH_STORE_DETAIL_SUCCESS';
export const FETCH_STORE_DETAIL_FAILURE = 'FETCH_STORE_DETAIL_FAILURE';


export const fetchStoreDetailsRequest = () => ({
  type: FETCH_STORE_DETAIL_REQUEST
});

export const fetchStoreDetailsSuccess = storeDetails => ({
  type: FETCH_STORE_DETAIL_SUCCESS,
  payload: { storeDetails }
});

export const fetchStoreDetailsFailure = error => ({
  type: FETCH_STORE_DETAIL_FAILURE,
  payload: { error }
});


export const fetchStoreDetails = (idStore) => dispatch => {
  dispatch(fetchStoreDetailsRequest());
  return StoreService.fetchStoreDetails(idStore).then((response) =>{
      dispatch(fetchStoreDetailsSuccess(response));
    }
  )
}
