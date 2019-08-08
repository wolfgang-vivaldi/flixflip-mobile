import {
  GET_LIST_START,
  GET_LIST_FAILED,
  GET_LIST_SUCCESS
} from "../actions/const/movie";

const initialState = {
  isLoading: false,
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

    default:
      return state;
  }
};
