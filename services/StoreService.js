import API from './index';
import AppUrls from '../config/AppUrls';
import { buildPathWithParams } from '../utils/Paths';

class StoreService {

  static fetchStores(filters = []) {
    let url = AppUrls.api.storesList
    if(filters.length > 0){
      url += "/search?";
      filters.map(filter => url += filter["key"] + "=" + filter["value"] + "&");
    }
    console.log('url ' + url);
    return API.get(url).then((response) => {
       return response.data;
    })
  }

  static fetchStoreDetails(idStore) {
      let url = buildPathWithParams(AppUrls.api.storeDetails, { idStore });
      return API.get(url).then((response) => {
         return response.data;
      })
  }

  static fetchServiceDetails(idStore, idService) {
      return API.get(buildPathWithParams(AppUrls.api.serviceDetails, { idStore, idService })).then((response) => {
         return response.data;
      })
  }

}

export default StoreService;
