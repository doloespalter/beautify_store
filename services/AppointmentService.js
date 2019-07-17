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

  static fetchMyAppointments(storeId, date, token) {
    let url = buildPathWithParams(AppUrls.api.appointments, { storeId, date });
    return API.getWithToken(url, token).then((response) => {
       return response.data;
    })
  }

  static fetchPendingAppointments(storeId, token) {
    let url = buildPathWithParams(AppUrls.api.confirmAppointments, { storeId });
    return API.getWithToken(url, token).then((response) => {
       return response.data;
    })
  }

  static fetchAppointmentDetails(idAppointment, token) {
    let url = buildPathWithParams(AppUrls.api.appointmentDetails, { idAppointment });
    return API.getWithToken(url, token).then((response) => {
       return response.data;
    })
  }

  static confirmAppointment(storeId, appointmentId, token) {
    let url = buildPathWithParams(AppUrls.api.confirmAppointment, { storeId, appointmentId });
    return API.putWithToken(url, token).then((response) => {
       return response.data;
    })
  }

  static cancelAppointment(storeId, appointmentId, token) {
    console.log("cancel");
    let url = buildPathWithParams(AppUrls.api.cancelAppointment, { storeId, appointmentId });
    console.log(url);
    return API.putWithToken(url, token).then((response) => {
       return response.data;
    })
  }
}

export default AppointmentService;
