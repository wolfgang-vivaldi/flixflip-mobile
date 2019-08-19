import Axios from "axios";
import {
  SIMILAR_MOVIE_FAILED,
  SIMILAR_MOVIE_START,
  SIMILAR_MOVIE_SUCCESS
} from "./const/similar";
import { BASE_URL, API_KEY } from "../../customLib/APIServices";

const similarStart = () => ({
  type: SIMILAR_MOVIE_START
});
const similarFailed = err => ({
  type: SIMILAR_MOVIE_FAILED,
  payload: err
});
const similarSuccess = data => ({
  type: SIMILAR_MOVIE_SUCCESS,
  payload: data
});
export const getSimilarMovie = param => dispatch => {
  let pages = param.page ? param.page : "1";

  dispatch(similarStart());
  return Axios.get(
    `${BASE_URL}movie/${
      param.id
    }/similar?api_key=${API_KEY}&language=en-US&page=${pages}`
  )
    .then(res => {
      dispatch(similarSuccess(res.data));
      return res.data;
    })
    .catch(err => {
      dispatch(similarFailed(err));
      throw err;
    });
};
