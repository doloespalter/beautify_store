import ReviewService from '../services/ReviewService';

export const CREATE_REVIEW_REQUEST   = 'CREATE_REVIEW_REQUEST';
export const CREATE_REVIEW_SUCCESS = 'CREATE_REVIEW_SUCCESS';
export const CREATE_REVIEW_FAILURE = 'CREATE_REVIEW_FAILURE';


export const createReviewRequest = () => ({
  type: CREATE_REVIEW_REQUEST
});

export const createReviewSuccess = availableTimings => ({
  type: CREATE_REVIEW_SUCCESS,
  payload: {}
});



export const createReview = (body, token) => dispatch => {
  dispatch(createReviewRequest());
  return AppointmentService.createReview(body, token).then((response) => {
      dispatch(createReviewSuccess(response))
      return response.message;
    }
  )
}

export const fetchStoreReviews = (idStore) => dispatch => {
  return ReviewService.fetchStoreReviews(idStore).then((response) => {
      const reviews = response.reviews;
      return reviews;
    }
  )
}
