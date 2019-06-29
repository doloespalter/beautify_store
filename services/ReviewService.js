import API from './index';
import AppUrls from '../config/AppUrls';
import axios from 'axios';
import { buildPathWithParams } from '../utils/Paths';
class ReviewService {

  static createReview(body,token) {
    return API.postWithToken(AppUrls.api.createReview, body, token).then((response) => {
       return response.data;
    })
  }

  static fetchStoreReviews(idStore) {
    let url = buildPathWithParams(AppUrls.api.storeReviews, { idStore });
    return API.get(url).then((response) => {
       return response.data;
    })
  }

}


export default ReviewService;
