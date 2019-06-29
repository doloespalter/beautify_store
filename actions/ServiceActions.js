import StoreService from '../services/StoreService';

export const FETCH_SERVICE_DETAIL_REQUEST   = 'FETCH_SERVICE_DETAIL_REQUEST';
export const FETCH_SERVICE_DETAIL_SUCCESS = 'FETCH_SERVICE_DETAIL_SUCCESS';
export const FETCH_SERVICE_DETAIL_FAILURE = 'FETCH_SERVICE_DETAIL_FAILURE';


export const fetchServiceDetailsRequest = () => ({
  type: FETCH_SERVICE_DETAIL_REQUEST
});

export const fetchServiceDetailsSuccess = serviceDetails => ({
  type: FETCH_SERVICE_DETAIL_SUCCESS,
  payload: { serviceDetails }
});

export const fetchServiceDetailsFailure = error => ({
  type: FETCH_SERVICE_DETAIL_FAILURE,
  payload: { error }
});


export const fetchServiceDetails = (idStore, idService) => dispatch => {
  dispatch(fetchServiceDetailsRequest());
  return StoreService.fetchServiceDetails(idStore, idService).then((response) =>{
      response.employees = convertEmployeeList(response.employees);
      dispatch(fetchServiceDetailsSuccess(response))
    }
  )
}

const convertEmployeeList = (employees) => {
    var convertedList = [];
    var aux = {};
    aux.label = "Sin Preferencia";
    aux.value = 0;
    convertedList.push(aux);
    for (var i =0; i< employees.length; i++){
      var aux = {};
      aux.label = employees[i].name;
      aux.value = employees[i].id;
      convertedList.push(aux);
    }
  return convertedList;
}
