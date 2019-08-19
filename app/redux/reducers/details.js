import {
  DETAIL_MOVIE_START,
  DETAIL_MOVIE_FAILED,
  DETAIL_MOVIE_SUCCESS
} from "../actions/const/details";

const initialState = {
  isLoading: false,
  error: null,
  details: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DETAIL_MOVIE_START:
      return {
        ...state,
        isLoading: true
      };
    case DETAIL_MOVIE_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case DETAIL_MOVIE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        details: action.payload
      };

    default:
      return state;
  }
};
