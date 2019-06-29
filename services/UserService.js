import API from './index';
import AppUrls from '../config/AppUrls';
import response_types from '../constants/response_types'
import { buildPathWithParams } from '../utils/Paths';

class UserService {

  static getUserDetails(userToken) {
   return API.getWithAuthenticationHeader(AppUrls.api.getUserProfile, {}, userToken)
      .then((response) => {
          return response.data;
      })
      .catch((error) =>{
        console.log(error);
      });
  }

  static editUserProfile(values, userToken) {
    let data = {
      name: values.name,
      address: values.address,
      phone: values.phone
    }
    let userId = values.id;
    let url = buildPathWithParams(AppUrls.api.editUserProfile, {userId});
    return API.putWithAuthenticationHeader(url, data, userToken)
      .then((response) => {
        return response.data;
      })
      .catch((error) =>{
        console.log(error);
      });
  }

  static resetPassword(email) {
    let data = {
      email: email
    }
    return API.put(AppUrls.api.resetPassword, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) =>{
        console.log(error);
      });
  }

  static changePassword(passwords, userToken) {
    let data = {
      password: passwords.password,
      passwordConfirm: passwords.passwordConfirm
    }
    return API.putWithAuthenticationHeader(AppUrls.api.changePassword, data, userToken)
      .then((response) => {
        return response.data;
      })
      .catch((error) =>{
        console.log(error);
      });
  }


  static sendNotificationToken(notificationToken, userToken) {
    let body = {
      token: notificationToken
    }
    return API.putWithAuthenticationHeader(AppUrls.api.notificationToken, body, userToken)
      .then((response) => {
        return response.data;
      })
      .catch((error) =>{
        console.log(error);
      });
  }

}


export default UserService;
