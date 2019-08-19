import {
  SIMILAR_MOVIE_START,
  SIMILAR_MOVIE_FAILED,
  SIMILAR_MOVIE_SUCCESS
} from "../actions/const/similar";

const initialState = {
  isLoading: false,
  error: null,
  similar: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIMILAR_MOVIE_START:
      return {
        ...state,
        isLoading: true
      };
    case SIMILAR_MOVIE_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case SIMILAR_MOVIE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        similar: action.payload
      };

    default:
      return state;
  }
};
