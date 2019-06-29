import API from './index';
import AppUrls from '../config/AppUrls';
import axios from 'axios';


class AuthenticationService {


  static login(email, password) {
   return API.post(AppUrls.api.login, { email, password })
      .then((response) => {return response.data});
  }

  static register(values) {
    let data = {
      name: values.name,
      email: values.email,
      password: values.password
    }
   return API.post(AppUrls.api.register, data)
      .then((response) => {
          if(response.data.hasOwnProperty('id')){
            return "OK";
          }else{
            return response.data;
          }
      });
  }

}


export default AuthenticationService;
