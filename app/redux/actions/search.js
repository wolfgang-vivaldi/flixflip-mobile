import {
  SEARCH_MOVIES_START,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES_FAILED,
  MORE_RESULTS_START,
  MORE_RESULTS_FAILED,
  MORE_RESULTS_SUCCESS
} from "./const/search";
import Axios from "axios";
import { BASE_URL, API_KEY } from "../../customLib/APIServices";

const startSearchMovie = () => ({
  type: SEARCH_MOVIES_START
});
const failedSearchMovie = err => ({
  type: SEARCH_MOVIES_FAILED,
  payload: err
});
const successSearchMovie = movies => ({
  type: SEARCH_MOVIES_SUCCESS,
  payload: movies
});

export const searchMovies = param => dispatch => {
  dispatch(startSearchMovie());
  return Axios.get(
    `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${param}&page=1`
  )
    .then(res => {
      dispatch(successSearchMovie(res.data));
      return res.data;
    })
    .catch(err => {
      dispatch(failedSearchMovie(err));
      throw err;
    });
};

const moreStart = () => ({
  type: MORE_RESULTS_START
});
const moreFailed = err => ({
  type: MORE_RESULTS_FAILED,
  payload: err
});
const moreSuccess = movies => ({
  type: MORE_RESULTS_SUCCESS,
  payload: movies
});

export const moreSearchResults = param => dispatch => {
  dispatch(moreStart());
  return Axios.get(
    `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${param}&page=1`
  )
    .then(res => {
      dispatch(moreSuccess(res.data));
      return res.data;
    })
    .catch(err => {
      dispatch(moreFailed(err));
      throw err;
    });
};
