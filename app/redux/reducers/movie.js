import {
  GET_LIST_START,
  GET_LIST_FAILED,
  GET_LIST_SUCCESS,
  LOAD_MORE_START,
  LOAD_MORE_FAILED,
  LOAD_MORE_SUCCESS
} from "../actions/const/movie";

const initialState = {
  isLoading: false,
  loadMore: false,
  error: null,
  popular: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_LIST_START:
      return {
        ...state,
        isLoading: true
      };
    case GET_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    case GET_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        popular: payload
      };
    case LOAD_MORE_START:
      return {
        ...state,
        loadMore: true
      };
    case LOAD_MORE_FAILED:
      return {
        ...state,
        loadMore: false,
        error: payload
      };
    case LOAD_MORE_SUCCESS:
      return {
        ...state,
        loadMore: false,
        error: null
      };
    default:
      return state;
  }
};
