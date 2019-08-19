import { combineReducers } from "redux";
import details from "./details";
import movie from "./movie";
import search from "./search";
import similar from "./similar";

const app = combineReducers({
  movie,
  similar,
  search,
  details
});

export default app;
