import {
  SEARCH_MOVIES_START,
  SEARCH_MOVIES_FAILED,
  SEARCH_MOVIES_SUCCESS,
  MORE_RESULTS_START,
  MORE_RESULTS_FAILED,
  MORE_RESULTS_SUCCESS
} from "../actions/const/search";

const initialState = {
  isLoading: false,
  isLoadMore: false,
  error: null,
  results: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MORE_RESULTS_START:
      return {
        ...state,
        isLoadMore: true
      };
    case SEARCH_MOVIES_START:
      return {
        ...state,
        isLoading: true
      };
    case MORE_RESULTS_FAILED:
      return {
        ...state,
        isLoadMore: false,
        error: null
      };
    case SEARCH_MOVIES_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case MORE_RESULTS_SUCCESS:
      return {
        ...state,
        isLoadMore: false,
        error: null
      };
    case SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        results: action.payload
      };

    default:
      return state;
  }
};
