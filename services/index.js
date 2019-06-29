import axios from 'axios';
import AppUrls from '../config/AppUrls';

class ApiService {
  constructor() {
    const api = this;
    api.instance = axios.create({
      baseURL: AppUrls.api.baseUrl
    });
    // Add a response interceptor
    api.instance.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      //return Promise.reject(error);
      return error.response;
    });
  }

  get logoutStatus() {
    return [401];
  }

  request(options) {
    return this.instance.request(options);
  }

  get(url, params = {}) {
    if (!Object.keys(params).length) {
      return this.instance.get(url);
    }

    const qs = this.queryString(params);
    const join = url.includes('?') ? '&' : '?';
    return this.instance.get(url + join + qs);
  }

  getWithAuthenticationHeader(url, params = {}, userToken) {
    if (!Object.keys(params).length) {
      return this.instance.get(url,{
        headers:{
          'Authorization': `Bearer ${userToken}`
        }
      });
    }

    const qs = this.queryString(params);
    const join = url.includes('?') ? '&' : '?';
    return this.instance.get(url + join + qs, {
      headers:{
        'Authorization': `Bearer ${userToken}`
      }
    });
  }

  getWithToken(url, userToken) {

    console.log(url);
    console.log(userToken);
      return this.instance.get(url,{
        headers:{
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
          'Accept' : 'application/json'
        }
      });
  }

  post(url, params) {
    return this.instance.post(url, params,{
        headers: {
            'Content-Type': 'application/json',
        }
    });
  }

  postWithToken(url, params, token) {
    return this.instance.post(url, params,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
  }

  put(url, body) {
    return this.instance.put(url, body, {
        headers: {
            'Content-Type': 'application/json',
            'Accepts' : 'application/json'
        }
    });
  }

  putWithToken(url, userToken) {
    return this.instance.put(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
            'Accept' : 'application/json'
        }
    });
  }

  putWithAuthenticationHeader(url, params, userToken) {
    return this.instance.put(url, params,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
            'Accept' : 'application/json'
        }
    });
  }


}

const apiServiceInstance = new ApiService();

export default apiServiceInstance;
