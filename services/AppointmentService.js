import API from './index';
import AppUrls from '../config/AppUrls';
import { buildPathWithParams } from '../utils/Paths';

class AppointmentService {

  static fetchAvailableTimings(idStore, filters = []) {
    let url = buildPathWithParams(AppUrls.api.availableTimes, { idStore });

    if(filters.length > 0 ){
      filters.map(filter => url += filter["key"] + "=" + filter["value"] + "&");
      url.substring(0, url.length - 1);
    }
    return API.get(url).then((response) => {
       return response.data;
    })
  }


  static createAppointment(idStore, body,token) {
    let url = buildPathWithParams(AppUrls.api.createAppointment, { idStore });
    return API.postWithToken(url, body, token).then((response) => {
       return response.data;
    })
  }

  static cancelAppointment(idAppointment, token) {
    let url = buildPathWithParams(AppUrls.api.cancelAppointment, { idAppointment });
    return API.putWithAuthenticationHeader(url, {}, token).then((response) => {
       return response.data;
    })
  }

  static fetchMyAppointments(storeId, token) {
    let url = buildPathWithParams(AppUrls.api.appointments, { storeId });

    return API.getWithToken(url, token).then((response) => {
      console.log(response.data);
       return response.data;
    })
  }

  static fetchAppointmentDetails(idAppointment, token) {
    let url = buildPathWithParams(AppUrls.api.appointmentDetails, { idAppointment });
    return API.getWithToken(url, token).then((response) => {
       return response.data;
    })
  }
}

export default AppointmentService;
