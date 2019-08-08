import {
  GET_LIST_START,
  GET_LIST_FAILED,
  GET_LIST_SUCCESS
} from "./const/movie";
import Axios from "axios";
import { BASE_URL, API_KEY } from "../../customLib/APIServices";

const listStart = () => ({
  type: GET_LIST_START
});
const listFailed = err => ({
  type: GET_LIST_FAILED,
  payload: err
});
const listSuccess = list => ({
  type: GET_LIST_SUCCESS,
  payload: list
});

export const getPopularMovie = param => dispatch => {
  let pages = param ? param : "1";
  dispatch(listStart());
  return Axios.get(
    `${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${pages}`
  )
    .then(res => {
      dispatch(listSuccess(res.data));
      return res.data;
    })
    .catch(err => {
      console.log("errorr", err);

      dispatch(listFailed(err));
      throw err;
    });
};