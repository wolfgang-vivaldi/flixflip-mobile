import {
  DETAIL_MOVIE_START,
  DETAIL_MOVIE_FAILED,
  DETAIL_MOVIE_SUCCESS,
  GET_CREDITS_START,
  GET_CREDITS_FAILED,
  GET_CREDITS_SUCCESS
} from "./const/details";
import Axios from "axios";
import { BASE_URL, API_KEY } from "../../customLib/APIServices";

const detailMovieStart = () => ({
  type: DETAIL_MOVIE_START
});
const detailMovieFailed = err => ({
  type: DETAIL_MOVIE_FAILED,
  payload: err
});
const detailMovieSuccess = data => ({
  type: DETAIL_MOVIE_SUCCESS,
  payload: data
});
export const detailMovie = id => dispatch => {
  dispatch(detailMovieStart());
  return Axios.get(`${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`)
    .then(res => {
      dispatch(detailMovieSuccess(res.data));
      return res.data;
    })
    .catch(err => {
      dispatch(detailMovieFailed(err.response));
      throw err.response;
    });
};

const creditStart = () => ({
  type: GET_CREDITS_START
});
const creditFailed = err => ({
  type: GET_CREDITS_FAILED,
  payload: err
});
const creditSuccess = data => ({
  type: GET_CREDITS_SUCCESS,
  payload: data
});

export const getCredit = param => dispatch => {
  dispatch(creditStart());
  return Axios.get(`${BASE_URL}movie/${param}/credits?api_key=${API_KEY}`)
    .then(res => {
      dispatch(creditSuccess(res));
      return res.data;
    })
    .catch(err => {
      dispatch(creditFailed(err));
      throw err.response;
    });
};
